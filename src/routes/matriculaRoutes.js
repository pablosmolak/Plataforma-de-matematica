import express from "express"
import AlunoController from "./controllers/AlunoController.js"

const router = express.Router()

router
    .get("/alunos", AlunoController.listarAlunos)

export default router;
