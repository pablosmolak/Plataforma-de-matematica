import express from "express"
import MatriculaController from "../controllers/MatriculaController.js"


const router = express.Router()

router
    .get("/matriculas", MatriculaController.listarMatricula)
    .get("/matriculas/:id", MatriculaController.listarMatriculaId)
    .post("/matriculas", MatriculaController.cadastrarMatricula)
    .patch("/matriculas/:id", MatriculaController.atualizarMatricula)
    .delete("/matriculas/:id", MatriculaController.excluirMatricula)

export default router;
