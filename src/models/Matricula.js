import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const matriculaSchema = new mongoose.Schema(
    {
        usuario: {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true },
        },
        cursos: [
            {
                _id: {type: mongoose.Schema.Types.ObjectId, ref:'curso'},
                situacao: { type: String, trim: true, default:"Em Andamento"}, //em andamento ou concluido
                dataInicio: { type: Date, required: true, trim: true },
                dataConclusao: { type: Date, trim: true },
                ativo: { type: Boolean, required: true, default:true }
            }
        ],
    },

    {
        versionKey: 'true'
    }
);

matriculaSchema.plugin(mongoosePaginate);

const matricula = mongoose.model('matricula', matriculaSchema)

export default matricula