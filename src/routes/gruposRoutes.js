import express from "express"
import GrupoController from "../controllers/GrupoController.js";

const router = express.Router()

router
    .get("/grupos", GrupoController.listarGrupo)
    .get("/grupos/:id", GrupoController.listarGrupoId)
    .post("/grupos", GrupoController.cadastrarGrupo)
    .patch("/grupos/:id", GrupoController.atualizarGrupo)
    .delete("/grupos/:id", GrupoController.excluirGrupo)

export default router;