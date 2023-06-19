// importando express(req, res)
import faker from 'faker-br';
import bcrypt from 'bcryptjs';
import db from "../config/dbConect.js";
import Grupo from '../models/Grupo.js';
import Usuario from '../models/Usuario.js';
import Rota from '../models/Rota.js';
import Curso from '../models/Curso.js';
import Matricula from '../models/Matricula.js';
import mongoose from 'mongoose';

// estabelecendo e testando a conexão
db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
  console.log('Conexão com o banco estabelecida!')
});

// função para encrytar senha usando bcryptjs
function senhaHash() {
  return bcrypt.hashSync('123', 8);
}

// Função para gerar um numero aleatório entre 1 e 1000000,  
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//eliminando as rotas existentes
await Rota.deleteMany();

// rotas que serão inseridas no banco de dados
const rotas = [];

// função para retornar o nome de uma rota pela posição do array
const rotas_array =
  [
    'rotas',
    'rotas:id',
    'grupos',
    'grupos:id',
    'usuarios',
    'usuarios:id',
    'cursos',
    'cursos:id',
    'matriculas',
    'matriculas:id'
  ]
function getRotaName(i) {
  return rotas_array[i].toString();
}

function seedRotas(qtdrotas) {
  for (let i = 0; i < qtdrotas; i++) {
    const rota = {
      rota: getRotaName(i),
      dominio: 'localhost',
      ativo: true,
      verbo_get: true,
      verbo_put: true,
      verbo_patch: true,
      verbo_delete: true,
      verbo_post: true
    }
    rotas.push(rota);
  }
  return rotas;
}

seedRotas(rotas_array.length);
await Rota.collection.insertMany(rotas);
console.log(rotas.length + ' Rotas inseridas!');

//eliminando os grupos existentes
await Grupo.deleteMany();
const grupos = [];

// função para retornar o nome de alguns grupos fictícios
// criar uma constante com 100 grupos diferentes
const grupos_array = ['Administrador', 'CAED']

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
// Populando o banco de dados com dados falsos para testes de usuarios
await Usuario.deleteMany();

// array usuarios que serão inseridos no banco de dados
const usuarios = [];

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


function seedUsuario(qtdusuarios) {
  const usuarioFixo =
  {
    nome: 'Dev oliveira',
    user: 'dev',
    email: 'dev@gmail.com',
    senha: senhaHash(),
    link_foto: faker.image.avatar(),
    telefone: faker.phone.phoneNumber(),
    ativo: true,
    rotas: rotas,
    grupos: removerChaves(grupos)
  }
  usuarios.push(usuarioFixo);

  for (let i = 1; i <= qtdusuarios; i++) {
    let nome = faker.name.firstName();
    let nome_meio = faker.name.lastName();
    let sobrenome = faker.name.lastName();
    let email = nome + '.' + sobrenome + '' + getRandomInt(10000) + '@' + "gmail.com";

    const seedUsuarios =
    {
      nome: nome + ' ' + nome_meio + ' ' + sobrenome,
      user: nome + '.' + sobrenome,
      email: email.toLowerCase(),
      senha: senhaHash(),
      link_foto: faker.image.avatar(),
      ativo: true,
      telefone: faker.phone.phoneNumber(),
      rotas: rotas,
      grupos: removerChaves(grupos)
    }
    usuarios.push(seedUsuarios);
  }

  return usuarios;
}

seedUsuario(5);

// insertmany com ignore duplicates
await Usuario.collection.insertMany(usuarios, { ordered: false });
console.log(usuarios.length + ' Usuarios inseridos!');



//---------------------------------------------------------------
// Populando o banco de dados com dados falsos para testes de cursos
await Curso.deleteMany();

//function para retornar aleatoriamente um modulo de 1 a 10
const modulo = ["Modulo 1", "Modulo 2", "Modulo 3", "Modulo 4", "Modulo 5", "Modulo 6", "Modulo 7", "Modulo 8", "Modulo 9", "Modulo 10"]
function getModulo(i) {
  return modulo[i];
}
const nivel = ["Medio", "Superior"]
// retorna um nivel aleatorio
function getNivel() {
  return nivel[getRandomInt(2)];
}

// função para retornar um array de professores com 3 professores aleatorios
const professor = ["Professor 1", "Professor 2", "Professor 3", "Professor 4", "Professor 5", "Professor 6", "Professor 7", "Professor 8", "Professor 9", "Professor 10"]
function getProfessores() {
  const professores = [];
  for (let i = 0; i < 3; i++) {
    professores.push(professor[getRandomInt(10)]);
  }
  return professores;
}

// função para retornar um array de videos com 3 videos aleatorios
const videos = ["Video 1", "Video 2", "Video 3", "Video 4", "Video 5", "Video 6", "Video 7", "Video 8", "Video 9", "Video 10"]
// função para retornar um array de videos com 3 videos aleatorios
function getVideos() {
  const videos = [];
  for (let i = 0; i < 3; i++) {
    videos.push(videos[getRandomInt(10)]);
  }
  return videos;
}

// função para retornar um array de arquivos com 3 arquivos aleatorios
const arquivos = ["Arquivo 1", "Arquivo 2", "Arquivo 3", "Arquivo 4", "Arquivo 5", "Arquivo 6", "Arquivo 7", "Arquivo 8", "Arquivo 9", "Arquivo 10"]
function getArquivos() {
  const arquivos = [];
  for (let i = 0; i < 3; i++) {
    arquivos.push(arquivos[getRandomInt(10)]);
  }
  return arquivos;
}

// montar um array de aulas com 3 videos e 3 arquivos
const aulas_array = [];
function getAulas() {
  for (let i = 0; i < 3; i++) {
    const aula =
    {
      orientacao: faker.lorem.sentence(),
      videos: getVideos(),
      arquivos: getArquivos(),
      comentarios: faker.lorem.sentence(),
    }
    aulas_array.push(aula);
  }
  return aulas_array;
}

// array usuarios que serão inseridos no banco de dados
const cursos = [];

function seedCursos(qtd) {
  for (let i = 1; i <= qtd; i++) {
    const curso =
    {
      modulo: getModulo(i),
      nivel: getNivel(),
      professor: getProfessores(),
      aulas: getAulas(),
      ativo: true
    }
    cursos.push(curso);
    // console.log('Usuários ' + i + ' inseridos!');
  }
  return cursos;
}

seedCursos(30);

// insertmany com ignore duplicates
await Curso.collection.insertMany(cursos, { ordered: false });
console.log(cursos.length + ' Cursos inseridos!');



//---------------------------------------------------------------
// Populando o banco de dados com dados falsos para testes de matriculas
await Matricula.deleteMany();

// Remover todas as chaves de um array de objetos cursos
function removerChavesCurso(obj) {
  for (let i = 0; i < obj.length; i++) {
    delete obj[i].modulo
    delete obj[i].nivel;
    delete obj[i].professor;
    delete obj[i].aulas;
    delete obj[i].ativo;
  }
  return obj;
}

// Remover todas as chaves de um array de objetos cursos
function removerChavesUsuario(obj) {
  for (let i = 0; i < obj.length; i++) {
    delete obj[i].nome,
    delete obj[i].email,
    delete obj[i].senha,
    delete obj[i].telefone,
    delete obj[i].link_foto,
    delete obj[i].ativo,
    delete obj[i].rotas,
    delete obj[i].grupos
    }
  return obj;
}

// array de usuarios que serão inseridos no banco de dados e função para  retornar 3 usuarios aleatorios
const Usuarios = []
// função inserir 3 usuarios no array usuarios
function gerarUsuarios() {
  for (let i = 0; i < 3; i++) {
    usuarios.push(usuarios[getRandomInt(10)]);
  }
  return usuarios;
}

// Remover todas as chaves de um array de objetos cursos
function removerChavesUsuarioCurso(obj) {
  for (let i = 0; i < obj.length; i++) {
    delete obj[i].modulo
    delete obj[i].nivel;
    delete obj[i].professor;
    delete obj[i].aulas;
    delete obj[i].ativo;
  }
  return obj;
}

function getUsuarios() {
  const usuarios = [];

  for (let i = 0; i < 3; i++) {
    usuarios.push(removerChavesUsuario(usuarios)[getRandomInt(10)]);
  }
  return usuarios;
}

const arraySituacao = ["Em andamento", "Concluido"]
function getSituacao() {
  return arraySituacao[getRandomInt(2)];
}

// array usuarios que serão inseridos no banco de dados
/*
const matriculas = [];

function seedMatricula(qtd) {
  for (let i = 1; i <= qtd; i++) {
    const matricula =
    {
      usuario: getUsuarios(),
      curso: removerChavesCurso(cursos),
      situacao: getSituacao(),
      dataInicio: faker.date.past(),
      dataConclusao: faker.date.future(),
      ativo: true
    }
    matriculas.push(matricula);
  }
  return matriculas;
}

seedMatricula(30);


// insertmany com ignore duplicates
await Matricula.collection.insertMany(matriculas)
console.log(matriculas.length + ' Matrículas inseridas!');
*/
// encerrar a conexão com o banco de dados com uma mensagem no console
db.close();
console.log('Conexão com o banco de dados encerrada!');