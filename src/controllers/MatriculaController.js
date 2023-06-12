import matriculas from "../models/Matricula.js"
import usuarios from "../models/Usuario.js";
import cursos from "../models/Curso.js"

class MatriculaController {

    static listarMatricula = async (req, res) => {

        try {
            const nome = req.query.nome
            console.log(nome)
            const { page, perPage } = req.query

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
            }

            if (!nome) {
                // const matriculas = await matricula.paginate({}, options)

                // // retorno da busca desejada

                // matriculas.usuarios = await usuarios.find({ _id: { $in: matriculas.usuarios } }).lean();

                // return res.json(matriculas);

                const matricula = await matriculas.paginate({}, options)
                let matri = JSON.parse(JSON.stringify(matricula))
                matri.usuarios = await usuarios.find({_id : {$in: matri.usuarios }}).lean()
                matri.cursos = await cursos.find({_id : {$in: matri.cursos }}).lean()

                for (let i = 0; i < matri.docs.length; i++) {
                    matri.docs[i].usuarios = await matriculas.find({ _id: { $in: matri.docs[i].usuarios } }).lean();
                }

                for (let i = 0; i < matri.docs.length; i++) {
                    matri.docs[i].cursos = await cursos.find({ _id: { $in: matri.docs[i].cursos } }).lean();
                }
                
                return res.json(matri)

            }

            else{
                const matricula = await matriculas.paginate({nome: new RegExp(nome, 'i')}, options)
                let matri = JSON.parse(JSON.stringify(matricula))
                matri.usuarios = await matriculas.find({ _id: { $in: matri.usuarios } }).lean()
                matri.cursos = await cursos.find({ _id: { $in: matri.cursos } }).lean()

                for (let i = 0; i < matri.docs.length; i++) {
                    matri.docs[i].usuarios = await matriculas.find({ _id: { $in: matri.docs[i].usuarios } }).lean()
                }

                for (let i = 0; i < matri.docs.length; i++) {
                    matri.docs[i].cursos = await matriculas.find({ _id: { $in: matri.docs[i].cursos } }).lean()
                }

                return res.json(matri)
            }

        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }
    }

    static listarMatriculaId = async (req,res) => {
        try{
            const id = req.params.id

            matriculas.findById(id).then(async (matricula) => {
                let matri = JSON.parse(JSON.stringify(matricula))
                matri.usuarios = await matriculas.find({_id: {$in: matri.usuarios}}).lean()
                matri.cursos = await cursos.find({_id: {$in: matri.cursos}}).lean()
                

                return res.status(200).send(matri)
            })
            .catch((err) => {
                return res.status(400).json({error: true, code: 400, message: "ID invalido ou não encontrado"})
            })
        }catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }
    }

    static cadastrarMatricula = async (req,res) => {
        try{
            let matricula = new matriculas(req.body)//criação do usuario

            let emailExiste = await matriculas.findOne({email:req.body.email})
            let matriExiste = await matriculas.findOne({matri: req.body.matri})

            if(!emailExiste && !matriExiste){
                let senhaHash = bcrypt.hashSync(matricula.senha,8);
                matricula.senha = senhaHash;

                matricula.save().then(() => {
                    res.status(201).send(matricula.toJSON())
                })
                .catch((err) =>{
                    //console.log(err)
                    return res.status(500).json([{ error: true, code: 500, message: "Erro nos dados, confira e repita" }])
                })
            }
            else if(emailExiste){
                return res.status(422).json({ code: 422, message: "E-mail já cadastrado!" })

            }
            else if(matriExiste){
                return res.status(422).json({ code: 422, message: "Matricula já cadastrado!"})
            }
                
        }catch (err){
            //console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }
    }

    static atualizarMatricula = async (req,res) =>{
        try{
            var id = req.params.id
            var matricula = new matriculas(req.body)

            if(usuario.senha){
                var senhaHash = await bcrypt.hash(usuario.senha, 8)
                req.body.senha = senhaHash
            }

            matricula.findByIdAndUpdate(id, {$set: req.body}).then(()=>{
                res.status(201).json([{ code: 201, message: 'Matricula atualizado com sucesso' }])
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

    static excluirMatricula = async (req,res) => {
        try{
            let id = req.params.id
            const matricula = await matriculas.findById(id)

            if(!matricula){
                return res.status(400).json([{code: 400, mensage:"Matricula não Localizado!"}])
            }

            matriculas.findByIdAndDelete(id).then(() => {
                    return res.status(200).json({code: 200, message: "Matricula excluído com sucesso." })
            }).catch((err) =>{
                    console.log(err)
                })
        } catch(err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})
        }
    }


}

export default MatriculaController