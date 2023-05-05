import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const rotaSchema = new mongoose.Schema(

    {
        rota: {type: String, required: true, trim: true, unique: true},
        ativo: { type: Boolean },
        get: { type: Boolean },
        put: { type: Boolean },
        patch: { type: Boolean },
        delete: { type: Boolean },
        post: { type: Boolean }

    },

    {
        versionKey: true
    }
);

rotaSchema.plugin(mongoosePaginate);

const rota = mongoose.model('rota', rotaSchema);

export default rota;