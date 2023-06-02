import express from "express"

const router = express.Router()

router
    .get("/docs", (req,res) => {  
        return res.status(500).send("Bem Vindo a API da Plataforma de Matematica!")
    })

export default router