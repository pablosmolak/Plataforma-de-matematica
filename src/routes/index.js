import express from "express";
import usuario from "./usuariosRoutes.js";
import cursos from "./cursosRoutes.js";

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        usuario,
        cursos
    )
}

export default routes;

