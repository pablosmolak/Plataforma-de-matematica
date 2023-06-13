import express from "express"
import RotasController from "../controllers/RotasController.js"

const router = express.Router()

router
    .get("/rotas", RotasController.listarRotas)
    .get("/usuarios/:id",RotasController.listarRotasId)
    .post("/usuarios",RotasController.cadastrarRotas)
    .patch("/usuarios/:id",RotasController.atualizarRotas)
    .delete("/usuarios/:id",RotasController.excluirRotas)


export default router;