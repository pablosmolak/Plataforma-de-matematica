import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate"

const usuarioSchema = new mongoose.Schema(

    {
        nome: {type: String, required: true, trim: true, minlength: 3, maxlength: 200},
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
                get: {type: Boolean},
                put: {type: Boolean},
                delete: {type: Boolean},
                patch: {type: Boolean},
                post: {type: Boolean} 
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