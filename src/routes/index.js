import express from "express";
import usuario from "./usuariosRoutes.js";
import cursos from "./cursosRoutes.js";
import usuarios from "./usuariosRoutes.js"
import rotas from "./routeRotas.js"
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
 *        rotas:
 *           type: object
 *           properties:
 *             _id: 
 *               type: string
 *               example: "63759607e0a9fb91607a8c6d"
 *             rota:
 *               type: string
 *               example: "/usuarios"
 *             dominio:
 *               type: string
 *               example: "google.com"
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
 * 
 *     Grupo:
 *       type: object
 *       properties:
 *         _id: 
 *           type: string
 *           example: "63759607e0a9fb91607a8c6d"
 *         nome:
 *           type: string
 *           example: "/grupos"
 *         decricao:
 *           type: string
 *           example: "google.com"
 *         ativo: 
 *           type: boolean
 *           example: true
 *         unidades:
 *           type: object
 *           properties:
 *             _id: 
 *               type: string
 *               example: "63759607e0a9fb91607a8c6d"
 *             nome:
 *               type: string
 *               example: "IFRO Vilhena"
 *             localidade:
 *               type: string
 *               example: "Vilhena/RO"
 *             ativo:
 *               type: boolean
 *               example: true
 *         rotas:
 *           type: object
 *           properties:
 *             _id: 
 *               type: string
 *               example: "63759607e0a9fb91607a8c6d"
 *             rota:
 *               type: string
 *               example: "/grupos"
 *             dominio:
 *               type: string
 *               example: "google.com"
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
 *           example: "/grupos"
 *         dominio:
 *           type: string
 *           example: "google.com"
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
 *     login:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           example: "dev"
 *         senha:
 *           type: string
 *           example: "123"
 *               
 * 
 *     login_token_altera_senha:
 *       type: object
 *       properties:
 *         senha:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5"
 * 
 *     autorizacao:	
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: "200"
 *         message:
 *           type: string
 *           example: "Token válido!"
 *         user_id:
 *           type: string
 *           example: "6424d519ceb55d37fcbf8b54"
 * 
 *     permissao:	
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           example: "200"
 *         message:
 *           type: string
 *           example: "Acesso liberado!"
 *     Error:
 *       type: object
 *       properties:
 *        error:         
 *          type: boolean
 *        code:
 *          type: integer
 *        message:
 *         type: string
 *   
 *   responses:
 *     auth:
 *       '498':
 *          description: Token de autenticação não existe
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNWM4OTAwYWQxMzRmYmNkMThiYyIsIm5vbWUiOiJEZXYgb2xpdmVpcmEiLCJlbWFpbCI6ImRldkBnbWFpbC5jb20iLCJ1c2VyIjoiZGV2IiwiYXRpdm8iOnRydWUsImlhdCI6MTY4Njg2MjEyNiwiZXhwIjoxNjg2ODY5MzI2fQ.SWgi-rKsz6HvXQj5XZD5MGkbIFzCNTKyNDhkfTMhBms"
 *                  message:
 *                    type: object
 *                    example: "O Token de autenticação não existe!" 
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

