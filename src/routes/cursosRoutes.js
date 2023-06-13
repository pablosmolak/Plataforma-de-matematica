import express from "express";
import CursoController from "../controllers/CursoController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js"


const router = express.Router();

router
   .get("/cursos", CursoController.listarCursos)

export default router;