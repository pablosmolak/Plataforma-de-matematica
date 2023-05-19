import usuarios from "../models/Usuario.js"
import grupos from "../models/Grupo.js"
import bcrypt from "bcryptjs"

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
                user.grupos = await grupos.find({_id : {$in: user.grupos }}).lean()

                for (let i = 0; i < user.docs.length; i++) {
                   user.docs[i].grupos = await grupos.find({ _id: { $in: user.docs[i].grupos } }).lean();
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
            //console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }


    }

    static listarUsuarioId = async (req,res) => {
        try{
            const id = req.params.id

            usuarios.findById(id)
                .exec((err,usuarios) => {
                    if (err) {
                        return res.status(400).json({ error: true, code: 400, message: "ID inválido" })
                      }
                      if (!usuarios) {
                        return res.status(404).json({ code: 404, message: "Usuário não encontrado" })
                      } else {
                        return res.status(200).send(usuarios);
                      }
          
                })
        }catch (err){
            //console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }
    }
    
    static cadastrarUsuario = async (req,res) => {
        try{
            let usuario = new usuarios(req.body)//criação do usuario

            let emailExiste = await usuarios.findOne({email:req.body.email})
            let userExiste = await usuarios.findOne({user: req.body.user})

             if(!emailExiste){
                 let senhaHash = bcrypt.hashSync(usuario.senha,8);
                 usuario.senha = senhaHash;

            //     await usuario.save((err) => {
            //         if(err){
            //             return res.status(500).json([{ error: true, code: 500, message: "Erro nos dados, confira e repita" }])
            //         }else{
            //              res.status(201)
            //              res.send(usuario.toJSON())
            //          }
            //     })
             }



        }catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }
    }
}

export default UsuarioController