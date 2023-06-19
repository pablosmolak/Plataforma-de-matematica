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
                const usuario = await usuarios.paginate({nome: new RegExp(nome, 'i')}, options)
                let user = JSON.parse(JSON.stringify(usuario))
                user.grupos = await grupos.find({ _id: { $in: user.grupos } }).lean()

                for (let i = 0; i < user.docs.length; i++) {
                    user.docs[i].grupos = await grupos.find({ _id: { $in: user.docs[i].grupos } }).lean()
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

            usuarios.findById(id).then(async (usuario) => {
                let user = JSON.parse(JSON.stringify(usuario))
                user.grupos = await grupos.find({_id: {$in: user.grupos}}).lean()

                return res.status(200).send(user)
            })
            .catch((err) => {
                return res.status(404).json({error: true, code: 400, message: "Usuário não encontrado!"})
            })
        }catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }
    }
    
    static cadastrarUsuario = async (req,res) => {
        try{
            let usuario = new usuarios(req.body)//criação do usuario

            let emailExiste = await usuarios.findOne({email:req.body.email})
            let userExiste = await usuarios.findOne({user: req.body.user})

            if(!emailExiste && !userExiste){
                let senhaHash = bcrypt.hashSync(usuario.senha,8);
                usuario.senha = senhaHash;

                usuario.save().then(() => {
                    return res.status(201).send(usuario.toJSON())
                })
                .catch((err) =>{
                    //console.log(err)
                    return res.status(500).json([{ error: true, code: 500, message: "Erro nos dados, confira e repita" }])
                })
            }
            else if(emailExiste){
                return res.status(422).json({error: true, code: 422, message: "E-mail já cadastrado!" })
            }
            else if(userExiste){
                return res.status(422).json({error:true, code: 422, message: "Usuario já cadastrado!"})
            }
                
        }catch (err){
            //console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }
    }

    static atualizarUsuario = async (req,res) =>{
        try{
            var id = req.params.id
            var usuario = new usuarios(req.body)

            if(usuario.senha){
                var senhaHash = await bcrypt.hash(usuario.senha, 8)
                req.body.senha = senhaHash
            }

            usuarios.findByIdAndUpdate(id, {$set: req.body}).then(()=>{
                res.status(201).json({ code: 201, message: 'Cadastro atualizado com sucesso!' })
            })
            .catch((err) => {
                console.log(err)
                return res.status(500).json([{ error: true, code: 500, message: "Erro nos dados, confira e repita" }])
            })

        }

        catch(err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})
        }
    }
    
    static excluirUsuario = async (req,res) => {
        try{
            let id = req.params.id
            const usuario = await usuarios.findById(id)

            if(!usuario){
                return res.status(400).json([{code: 400, mensage:"Usuario não Localizado!"}])
            }

            usuarios.findByIdAndDelete(id).then(() => {
                    return res.status(200).json({code: 200, message: "Usuário excluído com sucesso." })
            }).catch((err) =>{
                    console.log(err)
            })

        }catch(err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})
        }
    }
}

export default UsuarioController