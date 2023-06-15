import express from "express"
import AutenticacaoController from "../controllers/AutenticacaoController.js"

const router = express.Router()

/**
 * @swagger
 * paths:
 *  /login:
 *    post:
 *      tags:
 *          - Login
 *      summary: Faz o login do usuário
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/login'
 *      responses:
 *        '200':
 *          description: Login realizado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkNWM4OTAwYWQxMzRmYmNkMThiYyIsIm5vbWUiOiJEZXYgb2xpdmVpcmEiLCJlbWFpbCI6ImRldkBnbWFpbC5jb20iLCJ1c2VyIjoiZGV2IiwiYXRpdm8iOnRydWUsImlhdCI6MTY4Njg2MjEyNiwiZXhwIjoxNjg2ODY5MzI2fQ.SWgi-rKsz6HvXQj5XZD5MGkbIFzCNTKyNDhkfTMhBms"
 *                  user:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: string
 *                        example: "6476d5c8900ad134fbcd18bc"
 *                      nome:
 *                        type: string
 *                        example: "Pablo Smolak"
 *                      email:
 *                        type: string
 *                        example: "smolaktest@gmail.com"
 *                      user:
 *                        type: string
 *                        example: "smolak.test"
 *                      ativo:
 *                        type: bollean
 *                        example: "true"
 *         $ref: '#/components/schemas/auth'     
*/

router
    .post("/login", AutenticacaoController.logar)

export default router