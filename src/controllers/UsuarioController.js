import usuarios from "../models/Usuario.js"
import grupo from "../models/Grupo.js"

class UsuarioController {

    static listarUsuario = async (req,res) => {

        try {
            const nome = req.query.nome
            const {page, perPage} = req.query

            const options = {
                nome: (nome),
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
            }

            if(!nome){
                const usuario = await usuarios.paginate({}, options)
                let user = JSON.parse(JSON.stringify(usuario))
                user.grupo = await grupo.find({_id : {$in: user.grupo }}).lean()

                for (let i = 0; i < user.docs.length; i++) {
                    user.docs[i].grupo = await grupo.find({ _id: { $in: user.docs[i].grupo } }).lean();
                }
                
                return res.json(user)
            }

            else{
                const usuario = await usuario.paginate({nome: new RegExp(nome, i)}, options)
                let user = JSON.parse(JSON.stringify(usuario))
                user.grupo = await grupo.find({ _id: { $in: user.grupo } }).lean()

                for (let i = 0; i < user.docs.length; i++) {
                    user.docs[i].grupo = await grupo.find({ _id: { $in: user.docs[i].grupo } }).lean()
                }

                return res.json(user)
            }
            
        }catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }


    }
}

export default UsuarioController