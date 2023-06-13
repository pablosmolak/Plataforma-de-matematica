import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js"

const router = express.Router()

router
    .get("/usuarios", AuthMiddleware, UsuarioController.listarUsuario)
    .get("/usuarios/:id", AuthMiddleware, UsuarioController.listarUsuarioId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .patch("/usuarios/:id", AuthMiddleware, UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", AuthMiddleware, UsuarioController.excluirUsuario)

export default router;