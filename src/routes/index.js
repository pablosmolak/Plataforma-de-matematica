import express from "express";
import usuarios from "./usuariosRoutes.js"
import rotas from "./routeRotas.js"

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        usuarios,
        rotas
    )
}

export default routes;

