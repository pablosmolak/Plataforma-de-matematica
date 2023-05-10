import express from "express"
import RotasController from "../controllers/RotasController"

const router = express.Router()

router
    .get("/rotas", RotasController.listarAlunos)

export default router;