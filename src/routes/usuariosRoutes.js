import express from "express"
import usuarioController from "../controllers/UsuarioController.js"

const router = express.Router()

router
    .get("/usuario", usuarioController.listarAlunos)

export default router;