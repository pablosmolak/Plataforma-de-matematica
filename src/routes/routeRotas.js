import express from "express"
import RotasController from "../controllers/RotasController.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js"

const router = express.Router()

router
    .get("/rotas", AuthMiddleware, RotasController.listarRotas)
    .get("/rotas/:id",AuthMiddleware, RotasController.listarRotaPorId)
    .post("/rotas",AuthMiddleware, RotasController.cadastrarRota)
    .patch("/rotas/:id",AuthMiddleware, RotasController.atualizarRota)
    .delete("/rotas/:id",AuthMiddleware, RotasController.excluirRota)


export default router;