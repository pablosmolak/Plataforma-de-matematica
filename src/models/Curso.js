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
        rotas: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rota' },
        rota: {type: String, required: true, trim: true, index: true},
        verbo_get: { type: Boolean, required: true, index: true, default: true },
        verbo_put: { type: Boolean, required: true, index: true, default: true },
        verbo_patch: { type: Boolean, required: true, index: true, default: true },
        verbo_delete: { type: Boolean, required: true, index: true, default: true },
        verbo_post: { type: Boolean, required: true, index: true, default: true },
        ativo: {type:Boolean, required: true},
    }]
    }],
    
    {

    
        versionKey: "true"
    }
);

cursoSchema.plugin(mongoosePaginate);

const curso = mongoose.model('curso', cursoSchema);

export default curso;
