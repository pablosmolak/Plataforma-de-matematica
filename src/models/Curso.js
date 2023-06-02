import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cursoSchema = new mongoose.Schema(
    [{
        modulo: {type: String, required: true, trim: true},
        nivel: {type: String, required: true, trim: true},
        aula: [{
            orientacao: {type: String, required: true, trim: true},
            videos: [{
                nomeArquivo: {type: String, required: true, trim: true},
                descricao: {type: String, required: true, trim: true},
                data: {type: Date},
                Nomeprofessor: {type: String, required: true, trim: true},
            }],
                arquivos: [{
                nomeArquivo: {type: String, required: true, trim: true},
                descricao: {type: String, required: true, trim: true},
                data: {type: Date}
            }],
            comentarios: {type: String, required: true, trim: true},
        }],

        ativo: {type: Boolean, required: true}
    }],

    {
        versionKey: "true"
    }
);

cursoSchema.plugin(mongoosePaginate);

const curso = mongoose.model('curso', cursoSchema);

export default curso;
