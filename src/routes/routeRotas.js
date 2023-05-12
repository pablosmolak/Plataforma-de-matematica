import express from "express"
import RotasController from "../controllers/RotasController"

const router = express.Router()

router
    .get("/Rotas", RotasController.listarAlunos)

export default router;