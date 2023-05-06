import express from "express"
import gruposController from "../controllers/GruposController"

const router = express.Router()

router
    .get("/grupos", usuarioController.listarGrupos)

export default router;