import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"

const router = express.Router()

router
    .get("/usuarios", UsuarioController.listarUsuario)
    .get("/usuarios/:id", UsuarioController.listarUsuarioId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)

export default router;