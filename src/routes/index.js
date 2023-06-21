import express from "express";
import usuario from "./usuariosRoutes.js";
import cursos from "./cursosRoutes.js";
import usuarios from "./usuariosRoutes.js"
import rotas from "./rotasRoutes.js"
import matricula from "./matriculaRoutes.js"
import grupos from "./gruposRoutes.js"
import autenticacao from "./AutenticacaoRoutes.js"

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *        _id: 
 *          type: string
 *          example: "63759607e0a9fb91607a8c6d"
 *        nome:
 *          type: string
 *          example: "Pablo Smolak"
 *        email:
 *          type: string
 *          example: "Smolaktest@gmail.com"
 *        ativo: 
 *          type: boolean
 *          example: true
 *        link_foto:
 *          type: string
 *          example: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
 *        senha (criptografada):
 *          type: string
 *          example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjRkNTE5Y2ViNTVkMzdmY2JmOGI1MyIsImlhdCI6MTY4MDI2ODMxOCwiZXhwIjoxNjgwMjc1NTE4fQ.desbT2UAGbnsgIa0coVlrBG798pkQlkuy15ODO-KTmg"           
 *        grupos:
 *           type: object
 *           properties:
 *             _id: 
 *               type: string
 *               example: "6424d518ceb55d37fcbf8b4c"
 *     Rotas:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: "63759607e0a9fb91607a8c6d"
 *         rota:
 *           type: string
 *           example: "/grupos"
 *         ativo: 
 *           type: boolean
 *           example: true
 *         verbo_get:
 *           type: boolean
 *           example: true
 *         verbo_post:  
 *           type: boolean
 *           example: true
 *         verbo_put:
 *           type: boolean
 *           example: true
 *         verbo_patch:
 *           type: boolean
 *           example: true
 *         verbo_delete:
 *           type: boolean
 *           example: true
 * 
 *     Grupo:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: "63759607e0a9fb91607a8c6d"
 *         nome:
 *           type: string
 *           example: "Alunos"
 *         descricao:
 *           type: string
 *           example: "grupo de alunos"
 *         ativo: 
 *           type: boolean
 *           example: true
 *         rotas:
 *           type: object
 *           properties:
 *             _id: 
 *               type: string
 *               example: "63759607e0a9fb91607a8c6d"
 *             rota:
 *               type: string
 *               example: "/grupos"
 *             ativo: 
 *               type: boolean
 *               example: true
 *             verbo_get:
 *               type: boolean
 *               example: true
 *             verbo_post:  
 *               type: boolean
 *               example: true
 *             verbo_put:
 *               type: boolean
 *               example: true
 *             verbo_patch:
 *               type: boolean
 *               example: true
 *             verbo_delete:
 *               type: boolean
 *               example: true
 *     Rota:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: "63759607e0a9fb91607a8c6d"
 *         rota:
 *           type: string
 *           example: "/rotas"
 *         ativo: 
 *           type: boolean
 *           example: true
 *         verbo_get:
 *           type: boolean
 *           example: true
 *         verbo_post:  
 *           type: boolean
 *           example: true
 *         verbo_put:
 *           type: boolean
 *           example: true
 *         verbo_patch:
 *           type: boolean
 *           example: true
 *         verbo_delete:
 *           type: boolean
 *           example: true
 *     Cursos:
 *       type: object
 *       properties:
 *         modulo:
 *           type: string
 *           example: Equação de 2° Grau
 *         nivel:
 *           type: string
 *           example: Médio
 *         professor:
 *           type: string
 *           example: Smolak
 *         aulas:
 *           type: object
 *           properties:
 *             nome:
 *               type: string
 *               example: Aula 1 
 *             orientação:
 *               type: string
 *               example: "Nessa aula é passado os conceitos iniciais da equação"
 *             videos:
 *               type: object
 *               properties:
 *                 nomeArquivo:
 *                   type: string
 *                   example: Video Aula 1
 *                 descricao:
 *                   type: string
 *                   example: iniciando os conceitos
 *                 data:
 *                   type: string
 *             exercicios:
 *               type: object
 *               properties:
 *                 nomeArquivo:
 *                   type: string
 *                   example: Video Aula 1
 *                 descricao:
 *                   type: string
 *                   example: iniciando os conceitos
 *                 data:
 *                   type: string
 *             resolucoes:
 *               type: object
 *               properties:
 *                 nomeArquivo:
 *                   type: string
 *                   example: Video Aula 1
 *                 descricao:
 *                   type: string
 *                   example: iniciando os conceitos
 *                 data:
 *                   type: string
 *         ativo:
 *           type: boolean
 *           example: true
 *                                           
 *     Login:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           example: "dev"
 *         senha:
 *           type: string
 *           example: "123"
 *     Error:
 *       type: object
 *       properties:
 *        error:         
 *          type: boolean
 *        code:
 *          type: integer
 *        message:
 *         type: string
 *     Grupos:
 *       type: object
 *       properties:
 *         nome:
 *           type: String
 *           example: Administradores de Cursos
 *         descricao:
 *           type: String
 *           example: Grupos de administradores
 *         ativo:
 *           type: boolean
 *           example: true 
 */


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

