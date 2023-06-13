import grupos from "../models/Grupo.js";
import usuarios from "../models/Usuario.js";
import rotas from "../models/Rota.js";

class GrupoController {

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
                const grupo = await grupos.paginate({}, options)
                let gpo = JSON.parse(JSON.stringify(grupo))
                
                //for (let i = 0; i < gpo.docs.length; i++) {
                 //   gpo.docs[i].usuarios = await usuarios.find({ _id: { $in: gpo.docs[i].usuarios } }).lean();
                //}
                
                return res.json(gpo)
            }

            else{
                const grupo = await grupos.paginate({nome: new RegExp(nome, 'i')}, options)
                let gpo = JSON.parse(JSON.stringify(grupo))
               // gpo.grupos = await grupos.find({ _id: { $in: gpo.grupos } }).lean()

               // for (let i = 0; i < gpo.docs.length; i++) {
                //    gpo.docs[i].grupos = await grupos.find({ _id: { $in: gpo.docs[i].grupos } }).lean()
               // }

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
            
            let grupoExiste = await grupos.findOne({nome:req.body.nome})
            
            if(!grupoExiste){
                grupo.save().then(()=>{
                    res.status(201).send(grupo.toJSON())
                }).catch((err)=>{
                    return res.status(500).json({ error: true, code: 500, message: "Erro nos dados, confira e repita" })
                })
            }
            
            else if(grupoExiste){
                return res.status(422).json({ code: 422, message: "Nome de Grupo já cadastrado!" })
            }
            
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
            const grupo = await grupos.findById(id)

            if(!grupo){
                return res.status(400).json({code: 400, mensage:"Grupo não Localizado!"})
            }

            grupos.findByIdAndDelete(id).then(()=>{
                res.status(200).send({ message: 'Grupo excluído com sucesso!' })
            }).catch((err)=>{
                console.log(err)
            })
            
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })

        }
    }
}

export default GrupoController