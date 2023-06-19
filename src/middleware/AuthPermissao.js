import usuarios from "../models/Usuario.js";
import rotas from "../models/Rota.js";
import grupos from "../models/Grupo.js";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const falhas = [];

const pegaToken = async (req) => {
    const [, token] = req.headers.authorization.split(' '); // desestruturação
    let decoded = await promisify(jwt.verify)(token, process.env.SECRET); // promisify converte uma função de callback para uma função async/await
    req.user_id = decoded.id;
    if (!decoded) {
        return res.status(401).json([{error:true, code: 401, message: "O token de autenticação não existe!" }]);
    } else {
        return req.user_id;
    }
}


class AuthPermissao {
    // VERIFICA PERMISSÃO PARA REQUISIÇÃO NA ROTA PASSADA COMO PARÂMETRO
    static verificarPermissao = async (rota_acessada, verbo, req, res) => {

        // Remover todos itens do array
        falhas.length = 0;

        // Carrega perfil do usuário incluindo as rotas e os grupos com as unidades e respectivas rotas 
        const usuarioPefil = await usuarios.findById(await pegaToken(req));

        // Verifica se o usuario está ativo no próprio perfil, NAO ESTANDO, todos os verbos e rotas serão bloqueadas
        if (!usuarioPefil.ativo) {
            return res.status(401).json([{ code: 401, message: "Usuário inativo, solicite acesso ao administrador do sistema." }]);
        }

        // buscar a rota acessada no cadastro de rotas
        const rota = await rotas.findOne({ rota: { $eq: rota_acessada } });

        // verificar se a rota existe no cadastro de rotas
        if (!rota) {
            return res.status(401).json([{ code: 401, message: "Rota  /" + rota_acessada.toUpperCase() + " não cadastrada no sistema, contate o administrador do sistema." }])
        }

        // verificar se o cadastro da rota está ativo no array rota
        if (!rota.ativo) {
            return res.status(401).json([{ code: 401, message: "Rota  /" + rota_acessada.toUpperCase() + " está desativada para todos os usuarios do sistema, contate o administrador do sistema." }])
        }

        // verificar se o verbo está disponível (true) no array rota
        if (!rota["verbo_" + verbo]) {
            return res.status(401).json([{ code: 401, message: `Operação " + ${verbo.toUpperCase()} na rota ${rota_acessada.toUpperCase()} está desativada para todos os usuários do sistema, contate o administrador do sistema.` }])
        }


        // Incluindo GRUPOS no perfil do usuaŕio "usuarioPefil" com as respectivas rotas e unidades cadastradas em cada grupo no qual o usuário pertence
        let user = JSON.parse(JSON.stringify(usuarioPefil));
        user.grupos = await grupos.find({ _id: { $in: user.grupos } }).lean();

        // Verificar se a rota e verbo passados estão inativos, no perfil do usuário logado
        for (let i = 0; i < usuarioPefil.rotas.length; i++) {
            if (usuarioPefil.rotas[i].rota === rota_acessada) {
                if (usuarioPefil.rotas[i].ativo) {
                    if (usuarioPefil.rotas[i]["verbo_" + verbo]) {
                        // executa se o usuário tiver permissão para acessar o recurso
                        try {
                            for (let i = 0; i < usuarioPefil.rotas.length; i++) {
                                if (usuarioPefil.rotas[i].rota === rota_acessada) {
                                    if (usuarioPefil.rotas[i]["verbo_" + verbo]) {
                                        falhas.length = 0;
                                        return false;
                                    }
                                }
                            }
                        } catch (error) {
                            console.error(error);
                            return res.status(500).json([{ code: 500, message: "Erro interno do servidor: Falha de retorno de chamada (callback)" }]);
                        }
                    }
                    else {
                        falhas.push([{ code: 401, message: "A operação " + verbo.toUpperCase() + " na rota: /" + rota_acessada.toUpperCase() + " está desativada para o usuário logado, contate o administrador do sistema." }])
                    }
                }
                else {
                    falhas.push([{ code: 401, message: " A rota: /" + rota_acessada.toUpperCase() + " está desativada para o perfil do usuário logado, contate o administrador do sistema." }])
                }
            }
        }

        // verificar se o grupo está ativo no cadastro do grupos de usuários
        for (let i = 0; i < user.grupos.length; i++) {
            if (user.grupos[i].ativo) {
                for (let j = 0; j < user.grupos[i].rotas.length; j++) {
                    if (user.grupos[i].rotas[j].rota === rota_acessada) {
                        if (user.grupos[i].rotas[j].ativo) {
                            //console.log(user.grupos[i].rotas[j]["verbo_" + verbo])
                            if (user.grupos[i].rotas[j]["verbo_" + verbo]) {
                                // executa o callback se o usuário tiver permissão para acessar o recurso
                                falhas.length = 0;
                                return false;
                            } else {
                                falhas.push([{ code: 401, message: "Operação " + verbo.toUpperCase() + " está desativada para o grupo: " + (user.grupos[i].nome).toUpperCase() + ", contate o administrador do sistema." }])
                            }
                        } else {
                            falhas.push([{ code: 401, message: "Rota /" + rota_acessada.toUpperCase() + " está inativa para o grupo: " + (user.grupos[i].nome).toUpperCase() + ", contate o administrador do sistema." }])
                        }
                    }
                }
            } else {
                falhas.push([{ code: 401, message: "Grupo " + user.grupos[i].nome + " está inativo, contate o administrador do sistema." }])
            }
        }
        if (falhas.length) {
            return res.status(401).json(falhas);
        }
    }
}

export default AuthPermissao;