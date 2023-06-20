import matriculas from "../models/Matricula.js"
import usuarios from "../models/Usuario.js";
import cursos from "../models/Curso.js"
import usuario from "../models/Usuario.js";
import AuthPermissao from "../middleware/AuthPermissao.js"

class MatriculaController {

    static listarMatricula = async (req, res) => {

        try{

            if(await AuthPermissao.verificarPermissao('matriculas', 'get', req, res) !== false){
                return
            }
            //const nome = req.query.nome
            const { page, perPage } = req.query

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
            }

            //if(!nome){
                const matricula = await matriculas.paginate({}, options)
                let matri = JSON.parse(JSON.stringify(matricula))
                matri.usuario = await usuarios.find({_id : {$in: matri.usuario }}).lean()
                matri.cursos = await cursos.find({_id : {$in: matri.cursos }}).lean()

                for (let i = 0; i < matri.docs.length; i++) {
                    matri.docs[i].usuario = await usuarios.find({ _id: { $in: matri.docs[i].usuario } }).lean();
                }
                

                for (let i = 0; i < matri.docs.length; i++) {
                    matri.docs[i].cursos = await cursos.find({ _id: { $in: matri.docs[i].cursos } }).lean();
                }
                
                return res.json(matri)
            /*}
            else{
                const matricula = await matriculas.paginate({nome: new RegExp(nome, 'i')}, options)
                let matri = JSON.parse(JSON.stringify(matricula))
                matri.usuarios = await usuario.find({ _id: { $in: matri.usuarios } }).lean()
                matri.cursos = await cursos.find({ _id: { $in: matri.cursos } }).lean()

                for (let i = 0; i < matri.docs.length; i++) {
                    matri.docs[i].usuario = await usuarios.find({ _id: { $in: matri.docs[i].usuario } }).lean()
                

                for (let i = 0; i < matri.docs.length; i++) {
                    matri.docs[i].cursos = await matriculas.find({ _id: { $in: matri.docs[i].cursos } }).lean()
                }

                return res.json(matri)
            }}*/

        } 
        
        catch(err){
            console.error(err)
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
    }

    static listarMatriculaId = async (req,res) => {
        try{

            if(await AuthPermissao.verificarPermissao('matriculas', 'get', req, res) !== false){
                return
            }

            const id = req.params.id

            await matriculas.findById(id).then(async (matricula) => {
                let matri = JSON.parse(JSON.stringify(matricula))
                matri.usuario = await usuario.find({_id: {$in: matri.usuario}}).lean()
                matri.cursos = await cursos.find({_id: {$in: matri.cursos}}).lean()
                return res.status(200).send(matri)
            })
            .catch((err) => {
                return res.status(404).json({error: true, code: 404, message: "Matrícula não encontrada!"})
            })
        }

        catch (err){
            //console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }

    static cadastrarMatricula = async (req,res) => {
        try{

            if(await AuthPermissao.verificarPermissao('matriculas', 'post', req, res) !== false){
                return
            }

            let matricula = new matriculas(req.body)
            
            const data = new Date(await Date.now())

            console.log(data)

            matricula.cursos[0] = {dataInicio:data}

            matricula.save().then(() => {
                 res.status(201).send(matricula.toJSON())
            })
            .catch((err) =>{
                console.log(err)
                return res.status(422).json({error: true, code: 422, message: "Erro nos dados, confira e repita!"})
            })  
        }
        
        catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }

    static atualizarMatricula = async (req,res) =>{
        try{

            if(await AuthPermissao.verificarPermissao('matriculas', 'patch', req, res) !== false){
                return
            }
            var id = req.params.id

            await matriculas.findById(id).then(() => {
                
                matriculas.findByIdAndUpdate(id, {$set: req.body}).then(()=>{
                    res.status(201).json({code: 201, message: 'Matricula atualizada com sucesso!'})
                })
                .catch((err) => {
                    //console.log(err) <------------verificar
                    return res.status(500).json({ error: true, code: 500, message: "Erro nos dados, confira e repita!" })
                })
            })
            .catch((err) => {
                //console.log(err)
                return res.status(404).json({error: true, code: 404, message: "Matrícula não encontrada!"})
            })
        }

        catch(err){
            //console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }

    static excluirMatricula = async (req,res) => {
        try{

            if(await AuthPermissao.verificarPermissao('matriculas', 'delete', req, res) !== false){
                return
            }

            let id = req.params.id
        
            await matriculas.findById(id).then(() => {

                matriculas.findByIdAndDelete(id).then(() => {
                        return res.status(200).json({code: 200, message: "Matrícula excluída com sucesso!" })
                })
            
            })
            .catch((err) => {
                //console.log(err)
                return res.status(404).json({error: true, code: 404, message: "Matrícula não encontrada!"})
            })

        } catch(err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"})
        }
    }
}

export default MatriculaController