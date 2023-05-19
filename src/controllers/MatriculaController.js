import matricula from "../models/Matricula";
import aluno from "../models/Aluno.js";
import curso from "../models/Curso.js"

class MatriculaController {
    static listarMatricula = async (req, res) => {
        try {
            const nome = req.query.aluno.nome
            console.log(nome)
            const { page, perPage } = req.query

            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
            }

            if (!nome) {
                const matriculas = await matricula.paginate({}, options)

                // retorno da busca desejada

                matriculas.alunos = await alunos.find({ _id: { $in: matriculas.alunos } }).lean();

                return res.json(matriculas);
            }

        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
        }

    }
}