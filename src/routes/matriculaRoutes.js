import express from "express"
import matriculaController from "../controllers/MatriculaController.js"


const router = express.Router()

router
    .get("/matriculas", matriculaController.listarMatricula)

export default router;
