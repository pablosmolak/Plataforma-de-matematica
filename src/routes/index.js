import express from "express";
import usuario from "./usuariosRoutes.js";
import cursos from "./cursosRoutes.js";
import usuarios from "./usuariosRoutes.js"
import rotas from "./routeRotas.js"
import docs from "./docsRoutes.js"


const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        usuario,
        cursos,
        docs,
        usuarios,
        rotas
    )
}

export default routes;

