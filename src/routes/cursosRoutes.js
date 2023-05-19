import express from "express";
import CursoController from "../controllers/CursoController.js";


const router = express.Router();

router
    .get("/cursos",CursoController.listarCursos)


export default router;