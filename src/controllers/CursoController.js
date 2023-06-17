import curso from "../models/Curso.js"
import rotas from "../models/Rota.js";

class CursoController {

  static listarCursos = async (req,res) => {

    try {

        await AuthPermissao.verificarPermissao('cursos', 'get', req, res)

        const nome = req.query.nome
        const {page, perPage} = req.query

        const options = {
            nome: (nome),
            page: parseInt(page) || 1,
            limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
        }

        if(!nome){
            const curso = await cursos.paginate({}, options)
            let cursos = JSON.parse(JSON.stringify(curso))
            cursos.grupos = await grupos.find({_id : {$in: user.grupos }}).lean()

            for (let i = 0; i < cursos.docs.length; i++) {
                cursos.docs[i].grupos = await grupos.find({ _id: { $in: cursos.docs[i].grupos } }).lean();
            }

            return res.json(cursos)
        }

        else{
            const curso = await cursos.paginate({nome: new RegExp(nome, 'i')}, options)
            let cursos = JSON.parse(JSON.stringify(curso))
            cursos.grupos = await grupos.find({ _id: { $in: cursos.grupos } }).lean()

            for (let i = 0; i < user.docs.length; i++) {
                cursos.docs[i].grupos = await grupos.find({ _id: { $in: cursos.docs[i].grupos } }).lean()
            }

            return res.json(user)
        }
        
    }catch (err){
        console.error(err)
        return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})
    }
}
    static listarCursosPorId = async (req, res) => {
        try {
            await cursos.findById(req.params.id).exec((err, rotas) => {
            if (err) {
                return res.status(500).json([{ error: true, code: 500, message: "Id da rota não localizado." }])
            } else {
                res.status(200).send(rotas);
            }
            })
        }catch (err) {
        // console.error(err);
        return res.status(500).json([{ error: true, code: 500, message: "Erro interno do Servidor" }])
        }
  }

  static cadastrarCurso = async (req, res) => {
    try {
      
        let novo_curso = new curso(req.body);

          novo_curso.save().then(() => {
            res.status(201).send(novo_curso.toJSON())
        })
        .catch((err) =>{
            console.log(err)
            return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, confira e repita" })
        })
      } catch (err) {
       console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

    static atualizarCurso = async (req,res) => {
    try {
        const id = req.params.id;
        await cursos.findByIdAndUpdate(id, { $set: req.body }, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Curso atualizado com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        }).clone().catch((err) => { console.log(err) })
      } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }
  static excluirCurso = async (req, res) => {
    try {
        const id = req.params.id;
        await cursos.findByIdAndDelete(id, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Curso removido com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        })
      } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }


}

export default CursoController;