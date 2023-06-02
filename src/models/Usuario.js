import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";

const usuarioSchema = new mongoose.Schema(

    {
        nome: {type: String, required: true, trim: true, minlength: 3, maxlength: 200},
        user: {type: String, required: true, trim: true, minlength: 3, maxlength: 200, unique: true},
        email: {type: String, required: true, trim: true, minlength: 3, unique: true},
        senha : {type: String, required: true, minlength: 8},
        telefone: {type: String, required: true, trim: true},
        link_foto: { type: String, trim: true },
        ativo: {type: Boolean, required: true, default: true},
        rotas: [
            {
                _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rota' },
                rota: {type: String, required: true, trim: true},
                ativo: {type: Boolean},
                verbo_get: { type: Boolean, required: true, index: true, default: true },
                verbo_put: { type: Boolean, required: true, index: true, default: true },
                verbo_patch: { type: Boolean, required: true, index: true, default: true },
                verbo_delete: { type: Boolean, required: true, index: true, default: true },
                verbo_post: { type: Boolean, required: true, index: true, default: true },
            }
        ],
        grupos: [
            {
                _id: {type: mongoose.Schema.Types.ObjectId, ref:'grupo'},
            }
        ]
    },

    {
        versionKey: 'true'
    }
)


usuarioSchema.plugin(mongoosePaginate);

const usuario = mongoose.model('usuario', usuarioSchema);

export default usuario