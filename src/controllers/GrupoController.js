import grupos from "../models/Grupo.js";
import AuthPermissao from "../middleware/AuthPermissao.js"

class GrupoController {

    static listarGrupo = async (req,res) => {

        try {

            if(await AuthPermissao.verificarPermissao('grupos', 'get', req, res) !== false){
                return
            }

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
                
                return res.json(gpo)
            }

            else{
                const grupo = await grupos.paginate({nome: new RegExp(nome, 'i')}, options)
                let gpo = JSON.parse(JSON.stringify(grupo))
               
                return res.json(gpo)
            }
        }
        
        catch(err){
            //console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }

    static listarGrupoId = async (req,res) => {
        try{

            if(await AuthPermissao.verificarPermissao('grupos', 'get', req, res) !== false){
                return
            }

            const id = req.params.id

            grupos.findById(id).then(async (grupo) => {
                let gpo = JSON.parse(JSON.stringify(grupo))
                return res.status(200).send(gpo)
            })
            .catch((err) => {
                //console.log(err)
                return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado!" })
            })
            
        }catch(err){
            //console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }

    static cadastrarGrupo = async (req,res) => {
        try{

            if(await AuthPermissao.verificarPermissao('grupos', 'post', req, res) !== false){
                return
            }

            let grupo = new grupos(req.body)//criação do grupo
            
            let grupoExiste = await grupos.findOne({nome:req.body.nome})
            
            if(!grupoExiste){
                grupo.save().then(()=>{
                    return res.status(201).send(grupo.toJSON())
                }).catch((err)=>{
                    return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, confira e repita!" })
                })
            }
            
            else if(grupoExiste){
                return res.status(422).json({ code: 422, message: "Nome de Grupo já cadastrado!" })
            }
            
        }catch(err){
            //console.error(err);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor!" })
        }
    }

    static atualizarGrupo = async (req,res) =>{
        try{

            if(await AuthPermissao.verificarPermissao('grupos', 'patch', req, res) !== false){
                return
            }

            const id = req.params.id            
            
            await grupos.findById(id).then(async () => {
                
                let nomeGrupoExiste = await grupos.findOne({nome:req.body.nome})

                if(nomeGrupoExiste){
                    return res.status(422).json({ error: true, code: 422, message: "Nome de Grupo já cadastrado!" })
                }

                grupos.findByIdAndUpdate(id, {$set: req.body}).then(()=>{
                    res.status(201).json({ code: 201, message: 'Grupo atualizado com sucesso!' })
                })
                .catch((err) => {
                    //console.log(err)
                    return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, confira e repita!" })
                })

            })
            .catch((err) => {
                //console.log(err)
                return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado!" })
            })
        }

        catch(err){
            //console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }

    static excluirGrupo = async (req,res) => {
        try{

            if(await AuthPermissao.verificarPermissao('grupos', 'delete', req, res) !== false){
                return
            }

            let id = req.params.id
            
            await grupos.findById(id).then(() => {
                
                grupos.findByIdAndDelete(id).then(()=>{
                    res.status(200).send({ message: 'Grupo excluído com sucesso!' })
                })
            })
            .catch((err) => {
                //console.log(err)
                return res.status(404).json({error: true, code: 404, message:"Grupo não encontrado!"})
            })
 
        } catch (err) {
            //console.error(err);
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor!" })

        }
    }
}

export default GrupoController