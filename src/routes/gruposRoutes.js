import express from "express"
import GruposController from "../controllers/GruposController"

const router = express.Router()

router
    .get("/grupos", GruposController.listarGrupos)

export default router;