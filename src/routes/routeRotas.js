import express from "express"
import RotasController from "../controllers/RotasController.js"

const router = express.Router()

router
    .get("/rotas", RotasController.listarRotas)

export default router;