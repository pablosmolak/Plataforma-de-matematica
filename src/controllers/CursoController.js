import curso from "../models/Curso.js"
import rotas from "../models/Rota.js";

class CursoController {

    static listarCursos = async (req,res) => {

        try {
            const nome = req.query.nome
            const {page, perPage} = req.query

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
            }

            if(!nome){
                const cursos = await curso.paginate({}, options)
                return res.json(cursos);
            }

            else{
                const cursos = await curso.paginate({ nome: new RegExp(nome, 'i') }, options);
                return res.json(cursos);
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
      
        let grupo = new cursos(req.body);
        grupo.save((err) => {
          if (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar curso.` })
          } else {
            res.status(201).send(curso.toJSON())
          }
        })
      } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
   // 
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