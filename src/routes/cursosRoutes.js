import express from "express";
import CursoController from "../controllers/CursoController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js"


const router = express.Router();

router
    .get("/cursos",CursoController.listarCursos)
    .get("/cursos/:id", CursoController.listarCursosPorId)
    .post("/cursos", CursoController.cadastrarCurso)
    .patch("/curso/:id",CursoController.atualizarCurso)
    .delete("/curso/:id", CursoController.excluirCurso)


export default router;