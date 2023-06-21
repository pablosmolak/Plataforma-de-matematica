import usuarios from "../models/Usuario.js"
import grupos from "../models/Grupo.js"
import bcrypt from "bcryptjs"
import AuthPermissao from "../middleware/AuthPermissao.js"

class UsuarioController {

    static listarUsuario = async (req,res) => {

        try {

            if(await AuthPermissao.verificarPermissao('usuarios', 'get', req, res) !== false){
                return
            }

            const nome = req.query.nome
            const {page, perPage} = req.query

            const options = {
                nome: (nome),
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
            }

            if(!nome){
                const usuario = await usuarios.paginate({}, options)
                let user = JSON.parse(JSON.stringify(usuario))
                user.grupos = await grupos.find({_id : {$in: user.grupos }}).lean()

                for (let i = 0; i < user.docs.length; i++) {
                    user.docs[i].grupos = await grupos.find({ _id: { $in: user.docs[i].grupos } }).lean();
                }

                return res.json(user)
            }

            else{
                const usuario = await usuarios.paginate({nome: new RegExp(nome, 'i')}, options)
                let user = JSON.parse(JSON.stringify(usuario))
                user.grupos = await grupos.find({_id : {$in: user.grupos }}).lean()

                for (let i = 0; i < user.docs.length; i++) {
                    user.docs[i].grupos = await grupos.find({ _id: { $in: user.docs[i].grupos } }).lean();
                }

                return res.json(user)
            }
            
        }catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }

    static listarUsuarioId = async (req,res) => {
        try{

            if(await AuthPermissao.verificarPermissao('usuarios', 'get', req, res)!== false){
                return
            }

            const id = req.params.id

            usuarios.findById(id).then(async (usuario) => {
                let user = JSON.parse(JSON.stringify(usuario))
                user.grupos = await grupos.find({_id: {$in: user.grupos}}).lean()

                return res.status(200).send(user)
            })
            .catch((err) => {
                return res.status(404).json({error: true, code: 400, message: "Usuário não encontrado!"})
            })
        }catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }
    
    static cadastrarUsuario = async (req,res) => {
        try{

            let usuario = new usuarios(req.body)//criação do usuario

            let emailExiste = await usuarios.findOne({email:req.body.email})
            let userExiste = await usuarios.findOne({user: req.body.user})

            if(!emailExiste && !userExiste){

                if(req.body.senha.length < 8){
                    return res.status(422).json({ error: true, code: 422, message: "Senha informada menor que 8 caracteres!"})
                }
                
                const grupo = await grupos.findOne({nome: "Alunos"})
                usuario.grupos = {_id: grupo._id}
                
                let senhaHash = bcrypt.hashSync(usuario.senha,8);
                usuario.senha = senhaHash;

                usuario.save().then(() => {
                    return res.status(201).send(usuario.toJSON())
                })
                .catch((err) =>{
                    //console.log(err)
                    return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, confira e repita!" })
                })
            }
            else if(emailExiste){
                return res.status(422).json({error: true, code: 422, message: "E-mail já cadastrado!" })
            }
            else if(userExiste){
                return res.status(422).json({error:true, code: 422, message: "Usuario já cadastrado!"})
            }
                
        }catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }

    static atualizarUsuario = async (req,res) =>{
        try{

            if(await AuthPermissao.verificarPermissao('usuarios', 'patch', req, res) !== false){
                return
            }
            const id = req.params.id
            const erros = [];
            usuarios.findById(id).then(async () => {

                let usuario = new usuarios(req.body)
                let emailExiste = await usuarios.findOne({email:req.body.email})
                let userExiste = await usuarios.findOne({user: req.body.user})
                
                if(emailExiste){
                    erros.push({error: true, code: 422, message: "E-mail já cadastrado!" })
                }
                if(userExiste){
                    erros.push({error: true, code: 422, message: "Usuario já cadastrado!"})
                }
                    
                if(usuario.senha){
                    
                    if(req.body.senha.length >= 8){
                        var senhaHash = await bcrypt.hash(usuario.senha, 8)
                        req.body.senha = senhaHash
                    }else{
                        erros.push({ error: true, code: 422, message: "Senha informada menor que 8 caracteres!" })
                    } 
                }

                if (erros.length) {
                    return res.status(422).json(erros);
                }
    
                usuarios.findByIdAndUpdate(id, {$set: req.body}).then(()=>{
                    res.status(201).json({ code: 201, message: 'Usuário atualizado com sucesso!' })
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(422).json({ error: true, code: 404, message: "Erro nos dados, confira e repita!" })
                })
            })
            .catch((err)=>{
                //console.log(err)
                return res.status(404).json({error: true, code: 404, message: "Usuário não encontrado!" })
            })
        }

        catch(err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }
    
    static excluirUsuario = async (req,res) => {
        try{

            if(await AuthPermissao.verificarPermissao('usuarios', 'delete', req, res) !== false){
                return
            }
            
            let id = req.params.id

            await usuarios.findById(id).then(() => {

                usuarios.findByIdAndDelete(id).then(() => {
                        return res.status(200).json({code: 200, message: "Usuário excluído com sucesso!" })
                })
            })
            .catch((err) => {
                //console.log(err)
                return res.status(404).json({error: true,code: 404, message:"Usuário não encontrado!"})
            })


        }catch(err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }
}

export default UsuarioController