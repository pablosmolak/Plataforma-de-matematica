import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const matriculaSchema = new mongoose.Schema(
    {
        usuario: {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario', required: true},
        },
        cursos: [
            {
                _id: {type: mongoose.Schema.Types.ObjectId, ref:'curso', required: true},
                situacao: { type: String, trim: true, default:"Em Andamento"}, //em andamento ou concluido
                dataInicio: { type: Date, trim: true },
                dataConclusao: { type: Date, trim: true },
                ativo: { type: Boolean, default: true }
            }
        ]
    },

    {
        versionKey: "_version"
    }
);

matriculaSchema.plugin(mongoosePaginate);

const matricula = mongoose.model('matricula', matriculaSchema)

export default matricula