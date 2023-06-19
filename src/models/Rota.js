import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const rotaSchema = new mongoose.Schema(

    {
        rota: {type: String, required: true, trim: true, unique: true},
        ativo: { type: Boolean, default: true },
        verbo_get: { type: Boolean, required: true, index: true, default: true },
        verbo_put: { type: Boolean, required: true, index: true, default: true },
        verbo_patch: { type: Boolean, required: true, index: true, default: true },
        verbo_delete: { type: Boolean, required: true, index: true, default: true },
        verbo_post: { type: Boolean, required: true, index: true, default: true },
    },

    {
        versionKey: 'true'
    }
);

rotaSchema.plugin(mongoosePaginate);

const rota = mongoose.model('rota', rotaSchema);

export default rota;