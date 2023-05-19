import curso from "../models/Curso.js"

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


}

export default CursoController