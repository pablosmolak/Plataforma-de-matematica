import grupos from "../models/Grupo.js";
import unidades from "../models/Unidade.js";
import rotas from "../models/Rota.js";



  class UsuarioController {

    static listarGrupo = async (req,res) => {

        try {
            const nome = req.query.nome
            const {page, perPage} = req.query

            const options = {
                nome: (nome),
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
            }

            if(!nome){
                const grupo = await usuarios.paginate({}, options)
                let gpo = JSON.parse(JSON.stringify(usuario))
                
                for (let i = 0; i < user.docs.length; i++) {
                    user.docs[i].usuarios = await usuarios.find({ _id: { $in: user.docs[i].usuarios } }).lean();
                }
                
                return res.json(gpo)
            }

            else{
                const grupo = await grupos.paginate({nome: new RegExp(nome, 'i')}, options)
                let gpo = JSON.parse(JSON.stringify(grupo))
                gpo.grupos = await grupos.find({ _id: { $in: gpo.grupos } }).lean()

                for (let i = 0; i < gpo.docs.length; i++) {
                    gpo.docs[i].grupos = await grupos.find({ _id: { $in: gpo.docs[i].grupos } }).lean()
                }

                return res.json(gpo)
            }
            
        }catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }


    }

    static listarGrupoId = async (req,res) => {
        try{
            const id = req.params.id

            grupos.findById(id).then(async (grupo) => {
                let gpo = JSON.parse(JSON.stringify(grupo))
                gpo.unidades = await unidades.find({_id: {$in: user.grupos}}).lean()

                return res.status(200).send(gpo)
            })
            
        } catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }
    }
    
    static cadastrarGrupo = async (req,res) => {
        try{
            let grupo = new grupos(req.body)//criação do grupo
            grupo.save((err) => {
              if (err) {
                res.status(500).send({ message: `${err.message} - falha ao cadastrar grupo.` })
              } else {
                res.status(201).send(grupo.toJSON())
              }
            })
          
        }catch (err) {
          console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
      }

    static atualizarGrupo = async (req,res) =>{
        try{
            const id = req.params.id            
            

            grupos.findByIdAndUpdate(id, {$set: req.body}).then(()=>{
                res.status(200).json([{ code: 200, message: 'Grupo atualizado com sucesso' }])
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
    
    static excluirGrupo = async (req,res) => {
        try{
            let id = req.params.id
            await grupos.findByIdAndDelete(id, (err) => {
              if (!err) {
                res.status(200).send({ message: 'Grupo removido com sucesso' })
              } else {
                res.status(500).send({ message: err.message })
              }
            })
          
        } catch (err) {
           console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    
        }
    }
}


export default GrupoController;
