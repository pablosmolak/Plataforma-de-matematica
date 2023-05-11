import faker from 'faker-br';
import bcrypt from 'bcryptjs';
import Matricula from '../models/Matricula'

//apagando todas matriculas
await Matricula.deleteMany();

//criando array para as Matriculas
const matriculas = [];

function removerChavesAlunos(obj) {
    for (let i = 0; i < obj.length; i++) {
        delete obj[i].nome
        delete obj[i].email
        delete obj[i].senha
        delete obj[i].telefone
        delete obj[i].link_foto
        delete obj[i].ativo
        delete obj[i].grupos
        
    }
    return obj;
}