import express from "express"
import AlunoController from "../controllers/AlunoController.js"

const router = express.Router()

router
    .get("/aluno", AlunoController.listarAluno)

export default router;