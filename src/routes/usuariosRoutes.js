import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"

const router = express.Router()

router
    .get("/usuarios", UsuarioController.listarUsuario)
    .get("/usuarios/:id", UsuarioController.listarUsuarioId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .patch("/usuarios/:id", UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", UsuarioController.excluirUsuario)

export default router;