import express from "express"
import MatriculaController from "./controllers/MatriculaController.js"

const router = express.Router()

router
    .get("/matriculas", MatriculaController.listarMatriculas)

export default router;
