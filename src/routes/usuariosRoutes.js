import express from "express"
import usuarioController from "../controllers/UsuarioController.js"

const router = express.Router()

router
    .get("/usuario", usuarioController.listarUsuario)

export default router;