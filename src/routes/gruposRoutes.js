import express from "express"
import GruposController from "../controllers/GruposController"

const router = express.Router()

router
    .get("/Grupos", GruposController.listarGrupos)

export default router;