import express from "express"
import usuarioController from "../controllers/UsuarioController"

const router = express.Router()

router
    .get("/usuario", usuarioController.listarAlunos)

export default router;