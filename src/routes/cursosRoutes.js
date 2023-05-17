import express from "express";
import CursosController from "./controllers/CursosController.js"

const router = express.Router();

router
    .get("/cursos",CursosController.listarCursos)
    .get("/cursos/:id", AuthMiddleware, CursoController.listarCursoPorId);

export default router;