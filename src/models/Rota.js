import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

const rotaSchema = new mongoose.Schema(

    {
        rota: {type: String, required: true, trim: true, unique: true},
        ativo: { type: Boolean },
        verbo_get: { type: Boolean },
        verbo_put: { type: Boolean },
        verbo_patch: { type: Boolean },
        verbo_delete: { type: Boolean },
        verbo_post: { type: Boolean }

    },

    {
        versionKey: true
    }
);

rotaSchema.plugin(mongoosePaginate);

const rota = mongoose.model('rota', rotaSchema);

export default rota;