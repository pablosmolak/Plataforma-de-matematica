import express from "express"
import MatriculaController from "../controllers/MatriculaController.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js"


const router = express.Router()

router
    .get("/matriculas", AuthMiddleware, MatriculaController.listarMatricula)
    .get("/matriculas/:id", AuthMiddleware, MatriculaController.listarMatriculaId)
    .post("/matriculas", AuthMiddleware, MatriculaController.cadastrarMatricula)
    .patch("/matriculas/:id", AuthMiddleware, MatriculaController.atualizarMatricula)
    .delete("/matriculas/:id", AuthMiddleware, MatriculaController.excluirMatricula)

export default router;
