import express from "express"
import GrupoController from "../controllers/GrupoController.js";

const router = express.Router()

router
    .get("/grupos", GrupoController.listarGrupos)

export default router;