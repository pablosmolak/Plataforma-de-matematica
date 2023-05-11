import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const alunoSchema = new mongoose.Schema(
    [{
        aluno: [{
          _id: {type: mongoose.Schema.Types.ObjectId, ref:'aluno'},
        }],
        curso: [{
            _id: {type: mongoose.Schema.Types.ObjectId, ref:'curso'},
            situacao: {type: String, required: true, trim: true},
            dataInicio: {type: Date, required: true, trim: true},
            dataConclusao: {type: Date, required: true, trim: true},
            
        }],

        ativo: {type: Boolean, required: true}
    }],

    {
        versionKey: true
    }
);

matriculaSchema.plugin(mongoosePaginate);

const matricula = mongoose.model('matricula', matriculaSchema);

export default matricula;
