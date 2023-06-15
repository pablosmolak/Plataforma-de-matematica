import express from "express";
import usuario from "./usuariosRoutes.js";
import cursos from "./cursosRoutes.js";
import usuarios from "./usuariosRoutes.js"
import rotas from "./routeRotas.js"
import matricula from "./matriculaRoutes.js"
import grupos from "./gruposRoutes.js"
import autenticacao from "./AutenticacaoRoutes.js"

const routes = (app) => {
    app.route('/').get((rep, res) => {
        res.status(200).redirect("/docs") // redirecionando para documentação
    })

    app.use(
        express.json(),
        usuario,
        cursos,
        usuarios,
        rotas,
        matricula,
        grupos,
        autenticacao
    )
}

export default routes;

