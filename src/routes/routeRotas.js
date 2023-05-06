import express from "express"
import rotasController from "../controllers/RotasController"

const router = express.Router()

router
    .get("/rotas", rotasController.listarAlunos)

export default router;