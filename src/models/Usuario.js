import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate"

const usuariosSchema = new mongoose.Schema(

    {
        nome: {type: String, required: true, trim: true, minlength: 3, maxlength: 200},
        email: {type: String, required: true, trim: true, minlength: 3, unique: true},
        senha : {type: String, required: true, minlength: 8},
        telefone: {type: String, required: true, trim: true},
        link_foto: { type: String, trim: true },
        ativo: {type: Boolean, required: true, default: true},
        rotas: [
            {
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
                _id: {type: mongoose.Schema.Types.ObjectId, ref:'grupos'},
            }
        ]
    },

    {
        versionKey: true
    }
)


usuariosSchema.plugin(mongoosePaginate);

const usuario = mongoose.model('rotas', rotaSchema);

export default usuario