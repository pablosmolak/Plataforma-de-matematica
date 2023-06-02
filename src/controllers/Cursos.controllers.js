import curso from "../models/Curso";


class CursosControllers {

    //GET para listar cursos com paǵinação
    static listarCursos = async (res,req) => {
        try {
            const curso = req.query.curso
            const {page, perPage} = req.query

            const options = {
                curso: (curso),
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
            };

            if (!curso) {
                const curso = await CursosControllers.paginate({}, options);
                let cursos = JSON.parse(JSON.stringify(curso));
                
            } else {

            }
            

            } catch (err) {
                console.error(err)
                return res.status(500).json({error: true, code: 500, message: "Erro interno no servidor!"})
            }

    };

}

export default CursosControllers;
