import express from "express"
import GrupoController from "../controllers/GrupoController.js"

const router = express.Router()

router
    .get("/gruposs", GrupoController.listarGrupos)
    .get("/grupos/:id", GrupoController.listarGrupos)
    .post("/grupos", GrupoController.cadastrarGrupos)
    .patch("/grupos/:id", GrupoController.atualizarGrupos)
    .delete("/grupos/:id", GrupoController.excluirGrupos)

export default router;