import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"

const router = express.Router()

router
    .get("/usuario", UsuarioController.listarUsuario)

export default router;