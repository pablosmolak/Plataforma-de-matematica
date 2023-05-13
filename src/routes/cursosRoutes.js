import express from "express";
import CursosController from "./controllers/CursosController.js"

const router = express.Router();

router
    .get("/Cursos",CursosController.listarCursos)

export default router;