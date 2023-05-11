import faker from "faker-br";
import bcrypt from "bcrypt";
import db from "../config/dbConect.js";
import Unidade from "../models/Usuario.js";

db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida! ')
});

// Função para gerar um numero aleatório entre 1 e 1000000,  
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Populando o banco de dados com dados falsos para testes de grupos
// //eliminando os grupos existentes
// await Usuario.deleteMany();
// // usuarios que serão inseridos no banco de dados
// const usuarios = [];

// function seedUsuario(qtdusuarios) {
//     for (let i = 1; i <= qtdusuarios; i++) {
//         let nome = faker.name.firstName();
//         let nome_meio = faker.name.lastName();
//         let sobrenome = faker.name.lastName();
//         let email = nome + '.' + sobrenome + '@' + "gmail.com";

//         const seedUsuarios =
//         {
//             nome: nome + ' ' + nome_meio + ' ' + sobrenome,
//             email: email.toLowerCase(),
//             senha: senhaHash(),
//             ativo: true,
//             //traçar a função rota com as rotas da api
//             rotas: rotas,
//             grupos: removerChaves(grupos)

//         }
//         usuarios.push(seedUsuarios);
//         // console.log('Usuários ' + i + ' inseridos!');
//     }
//     return usuarios;
// }
