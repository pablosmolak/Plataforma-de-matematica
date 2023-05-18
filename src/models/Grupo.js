import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const grupoSchema = new mongoose.Schema(

    {
        nome: {type: String, minlength:4, maxlength: 200, required: true, trim: true},
        descricao: {type: String, minlength: 4, maxlength: 200, reqquired: true, trim: true, index: true},
        ativo: {type: Boolean, required: true, default: true},
        rotas: [{
            _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rota' },
            rota: {type: String, required: true, trim: true, index: true},
            verbo_get:{type: Boolean},
            verbo_put: {type: Boolean},
            verbo_delete: {type: Boolean},
            verbo_patch: {type: Boolean},
            verbo_post: {type: Boolean},
            ativo: {type:Boolean, required: true},
        }]
    },

    {
        versionKey: 'true'
    }
);

grupoSchema.plugin(mongoosePaginate);

const grupo = mongoose.model('grupo', grupoSchema);

export default grupo;
