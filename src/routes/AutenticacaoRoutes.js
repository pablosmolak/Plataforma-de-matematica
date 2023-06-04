import express from "express"
import AutenticacaoController from "../controllers/AutenticacaoController.js"

const router = express.Router()

router
    .post("/login", AutenticacaoController.logar)

export default router