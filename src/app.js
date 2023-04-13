//importar sempre que vocÊ deseja se comunicar entre arquivos

import express from "express";
import db from "./config/dbConect.js";


db.on("error", console.log.bind(console, "Conecxão com o banco falhou!"));
db.once("open", () => {
    console.log('Conecxão com o banco establecida! ')
});

//instanciando o express
const app = express();

//habilitando o uso de jso0n pelo express
app.use(express.json());


export default app;