import faker from 'faker-br';
import db from '../config/dbConect.js';
import Rota from '../models/Rota.js';
import bcrypt from 'bcryptjs';


//eliminando as rotas existentes
await Rota.deleteMany();

// rotas que serão inseridas no banco de dados
const rotas = [];

// função para retornar o nome de uma rota pela posição do array
const rotas_array = ['rotas', 'rotas:id',
    'grupos', 'grupos:id',
    'usuarios', 'usuarios:id']
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


