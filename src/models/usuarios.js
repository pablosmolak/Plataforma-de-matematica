import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const usuariosSchema = new mongoose.Schema(

    {
        nome: {type: String, required: true, trim: true},
        rota: {type: String, required: true, trim: true},
        verbos: ['verbo', {type: String}],
        ativo: {type: Boolean, required: true}
    },

    {
        versionKey: false
    }
);

usuarios: {
    "id" : "int",
    "nome" : String,
    "email" : String,
    "telefone" : String,
    "senha" : String,
    "ativo": Boolean,
    "rotas": [
        {
            "rota" : String,
            "ativo" : Boolean,
            "get": Boolean,
            "put": Boolean,
            "delete" : Boolean,
            "patch" : Boolean,
            "post" : Boolean, 
        }
    ],
    "grupos" : [
        {
            "id": "hexadecimal",
        }
    ],

}


usuariosSchema.plugin(mongoosePaginate);

const usuario = mongoose.model('rotas', rotaSchema);

export default usuario