import faker from 'faker-br';
import db from '../config/dbConect.js';
import Unidade from '../models/Unidade.js';
import Grupo from '../models/Grupo.js';
import Aluno from '../models/Aluno.js';
import Rota from '../models/Rota.js';
import bcrypt from 'bcryptjs';

// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida!')
});

// Função para gerar um numero aleatório entre 1 e 1000000,  
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/*
    Função para inserir unidades no banco de dados
*/
//eliminando as rotas existentes
await Unidade.deleteMany();

// array de unidades do negócio
// const unidades_array = ['Matriz', 'Filial 1', 'Filial 2']
const unidades_array = ['Matriz', 'Filial 1', 'Filial 2']

function getUnidadesNome(i) {
    return unidades_array[i].toString();
}

// array de unidades geradas que será inserida no banco de dados
const unidades = [];

function seedUnidades(qtdunidades) {
    for (let i = 0; i < qtdunidades; i++) {
        const unidade = {
            nome: getUnidadesNome(i),
            localidade: faker.address.city() + ' - ' + faker.address.state(),
            ativo: true
        }
        unidades.push(unidade);
    }
    return unidades;
}

seedUnidades(unidades_array.length);
await Unidade.collection.insertMany(unidades);
console.log(unidades.length + ' Unidades inseridas!');

// ------------------------------------------------------------

//eliminando as rotas existentes
await Rota.deleteMany();

// rotas que serão inseridas no banco de dados
const rotas = [];

// função para retornar o nome de uma rota pela posição do array
const rotas_array = ['rotas', 'rotas:id',
    'grupos', 'grupos:id',
    'unidades', 'unidades:id',
    'alunos', 'alunos:id']
function getRotaName(i) {
    return rotas_array[i].toString();
}

function seedRotas(qtdrotas) {
    for (let i = 0; i < qtdrotas; i++) {
        const rota = {
            rota: getRotaName(i),
            ativo: true,
            verbo_get: true,
            verbo_put: true,
            verbo_patch: true,
            verbo_delete: true,
            verbo_post: true,
        }
        rotas.push(rota);
    }
    return rotas;
}
seedRotas(rotas_array.length);
await Rota.collection.insertMany(rotas);
console.log(rotas.length + ' Rotas inseridas!');

// ---------------------------------------------------------------
// Remover todas as chaves de um array de objetos unidades excepto o id
function removerChavesUnidades(obj) {
    for (let i = 0; i < obj.length; i++) {
        delete obj[i].nome
        delete obj[i].localidade;
        delete obj[i].ativo;
    }
    return obj;
}
//eliminando os grupos existentes
await Grupo.deleteMany();
const grupos = [];

// função para retornar o nome de alguns grupos fictícios
// criar uma constante com 100 grupos diferentes
const grupos_array = [ 'Administrador'] 

// const grupos_array = [ 'Administrador', 'Gerente', 'Supervisor', 'Operador', 'Vendedor']

function getGrupoName(i) {
    return grupos_array[i].toString();
}
function seedGrupos(qtdgrupos) {
    for (let i = 0; i < qtdgrupos; i++) {
        const seedGrupos =
        {
            nome: getGrupoName(i),
            descricao: faker.lorem.sentence(),
            ativo: true,
            unidades: removerChavesUnidades(unidades),
            rotas: rotas
        }
        grupos.push(seedGrupos);
        // console.log('Grupo ' + i + ' inserido!');
    }
    return grupos;
}
seedGrupos(grupos_array.length)
await Grupo.collection.insertMany(grupos);
console.log(grupos.length + ' Grupos inseridos!');

//---------------------------------------------------------------
// Populando o banco de dados com dados falsos para testes de grupos
//eliminando os grupos existentes
await Aluno.deleteMany();

// usuarios que serão inseridos no banco de dados
const alunos = [];


// Remover todas as chaves de um array de objetos excepto o id
function removerChaves(obj) {
    for (let i = 0; i < obj.length; i++) {
        delete obj[i].nome
        delete obj[i].descricao;
        delete obj[i].ativo;
        delete obj[i].rotas;
        delete obj[i].unidades;
    }
    return obj;
}


function seedAluno(qtdalunos) {
    for (let i = 1; i <= qtdalunos; i++) {
        let nome = faker.name.firstName();
        let nome_meio = faker.name.lastName();
        let sobrenome = faker.name.lastName();
        let email = nome + '.' + sobrenome + '@' + "gmail.com";

        const seedAlunos =
        {
            nome: nome + ' ' + nome_meio + ' ' + sobrenome,
            email: email.toLowerCase(),
            senha: senhaHash(),
            ativo: true,
            link_foto: faker.image.avatar(),
            rotas: rotas,
            grupos: removerChaves(grupos)

        }
        usuarios.push(seedAlunos);
        // console.log('Alunos ' + i + ' inseridos!');
    }
    return usuarios;
}

seedAluno(30);
await Usuario.collection.insertMany(alunos);
console.log(alunos.length + ' Alunos inseridos!');

// função para encrytar senha usando bcryptjs

function senhaHash() {
    return bcrypt.hashSync('123', 8);
}

//Deligando a conexão com o banco de dados com mensagem de sucesso ou de erro
db.close((err) => { err ? console.log(err) : console.log('Conexão com o banco encerrada!') });

// gerar uma sequencia de texto aleatório de 500 palavras

