import curso from "../models/Curso.js"

class CursoController {

    static listarCursos = async (req,res) => {

        try {
            const modulo = req.query.modulo
            const {page, perPage} = req.query

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
            }

            if(!modulo){
                const cursos = await curso.paginate({}, options)
                return res.json(cursos);
            }

            else{
                const cursos = await curso.paginate({ modulo: new RegExp(modulo, 'i') }, options);
                return res.json(cursos);
            }
            
        }catch (err){
            console.error(err)
            return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})

        }


    }
}

export default CursoController