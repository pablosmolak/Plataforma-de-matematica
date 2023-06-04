import express from "express";
import CursoController from "../controllers/CursoController.js";


const router = express.Router();

router
    .get("/cursos",CursoController.listarCursos)
    .get("/cursos/:id", CursoController.listarCursosPorId)


export default router;