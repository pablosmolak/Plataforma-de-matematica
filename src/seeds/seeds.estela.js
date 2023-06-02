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
function removerChavesAluno(obj) {
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

// array de alunos que serão inseridos no banco de dados e função para  retornar 3 alunos aleatorios
const alunos = []
// função inserir 3 alunos no array alunos
function gerarAlunos() {
  for (let i = 0; i < 3; i++) {
    alunos.push(usuarios[getRandomInt(10)]);
  }
  return alunos;
}

// Remover todas as chaves de um array de objetos cursos
function removerChavesAlunoCurso(obj) {
  for (let i = 0; i < obj.length; i++) {
    delete obj[i].modulo
    delete obj[i].nivel;
    delete obj[i].professor;
    delete obj[i].aulas;
    delete obj[i].ativo;
  }
  return obj;
}

function getAlunos() {
  const alunos = [];

  for (let i = 0; i < 3; i++) {
    alunos.push(removerChavesAluno(usuarios)[getRandomInt(10)]);
  }
  return alunos;
}

const arraySituacao = ["Em andamento", "Concluido"]
function getSituacao() {
  return arraySituacao[getRandomInt(2)];
}

// array usuarios que serão inseridos no banco de dados
const matriculas = [];

function seedMatricula(qtd) {
  for (let i = 1; i <= qtd; i++) {
    const matricula =
    {
      aluno: getAlunos(),
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


// encerrar a conexão com o banco de dados com uma mensagem no console
db.close();
console.log('Conexão com o banco de dados encerrada!');