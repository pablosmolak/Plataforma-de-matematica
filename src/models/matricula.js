import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import rotas from "./Rota";

const matriculaSchema = new mongoose.Schema(
    [{
        matricula: {type: int, required: true, trim: true},
        aluno: [{
          nome: {type: String, required: true, trim: true},
        }],
        curso: [{
            orientacao: {type: String, required: true, trim: true},
            aula: [{
                nomeAula: {type: String, required: true, trim: true},
                descricao: {type: String, required: true, trim: true},
                data: {type: Date}
            }],
            comentarios: {type: String, required: true, trim: true},
        }],

        ativo: {type: Boolean, required: true}
    }]
);

matriculaSchema.plugin(mongoosePaginate);

const rotas = mongoose.model('matricula', matriculaSchema);

export default rotas;
