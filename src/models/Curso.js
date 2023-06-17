import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cursoSchema = new mongoose.Schema(
    {
        modulo: {type: String, required: true, trim: true, minlength: 3, maxlength: 200},
        descricao:  {type: String, required: true, trim: true, minlength: 3},
        nivel: {type: String, required: true, trim: true},
        professor: {type: String, required: true, trim: true},
        aulas: [{
            nome: {type: String, required: true, trim:true},
            orientacao: {type: String, required: true, trim: true},
            videos: [{
                nomeArquivo: {type: String, required: true, trim: true},
                descricao: {type: String, required: true, trim: true},
                data: {type: Date}
            }],
            exercicios: [{
                nomeArquivo: {type: String, required: true, trim: true},
                descricao: {type: String, required: true, trim: true},
                data: {type: Date}
            }],
            resolucoes: [{
                nomeArquivo: {type: String, required: true, trim: true},
                descricao: {type: String, required: true, trim: true},
                data: {type: Date}
            }],
        }],
        ativo: {type:Boolean, required: true, default: true},
    
    },
    
    {
        versionKey: "_version"
    }
);

cursoSchema.plugin(mongoosePaginate);
const curso = mongoose.model('curso', cursoSchema);

export default curso;
