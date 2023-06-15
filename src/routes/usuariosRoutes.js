import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * paths:
 *  /usuarios:
 *    get:
 *      tags:
 *        - Usuários
 *      summary: Lista todos os usuários
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: nome
 *          schema:
 *            type: string
 *          description: Nome do usuário para filtrar
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: Número da página para retornar
 *        - in: query
 *          name: perPage
 *          schema:
 *            type: integer
 *          description: Quantidade de registros por página
 *      responses:
 *        200:
 *          description: Retorna a lista de usuários
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Usuario'
 *                  totalDocs:
 *                    type: integer
 *                  limit:
 *                    type: integer
 *                  totalPages:
 *                    type: integer
 *                  page:
 *                    type: integer
 *                  pagingCounter:
 *                    type: integer
 *                  hasPrevPage:
 *                    type: boolean
 *                  hasNextPage:
 *                    type: boolean
 *                  prevPage:
 *                    type: integer
 *                  nextPage:
 *                    type: integer
 *        400:
 *          description: ID inválido ou não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *        404:
 *          description: Usuario não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *    post: 
 *      tags:
 *        - Usuários
 *      summary: Cadastra um novo usuário
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *      responses:
 *        201:
 *          description: Usuario cadastrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuario'
 *        400:
 *          description: Erro ao cadastrar o usuário
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *        500:
 *          description: Erro interno do servidor
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  message:
 *                    type: string
 *  /usuarios/{id}:
 *    get:
 *      summary: Usuario encontrado por ID
 *      operationId: getUsuarioPorId
 *      tags:
 *        - Usuários
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do usuário para filtrar
 *          required: true
 *          schema:
 *            type: string
 * 
 * 
 *      responses:
 *        200:
 *          description: Retorna a lista de usuários
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Usuario'
 *        400: 
 *          description: ID inválido ou não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *        404:
 *          description: Usuario não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *
 *    patch:
 *      summary: Atualiza apenas os atributos passados no body de um usuário existente no banco de dados.
 *      tags:
 *        - Usuários
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar um usuário existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do usuário a ser atualizado.
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Usuario atualizado com sucesso. 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Usuario'
 *        '401':
 *          description: O usuário não tem permissão para atualizar o usuário.
 *        '500':
 *          description: Erro interno do servidor.
 *
 *    put:
 *      summary: Atualiza todos os atributos de um usuário existente no banco de dados.
 *      tags:
 *        - Usuários
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar um usuário existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do usuário a ser atualizado.
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Usuario atualizado com sucesso. 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Usuario'
 *        '401':
 *          description: O usuário não tem permissão para atualizar o usuário.
 *        '500':
 *          description: Erro interno do servidor.
 *
 *
 * 
 *    delete:
 *      summary: Exclui um usuário existente no banco de dados.
 *      tags:
 *        - Usuários
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por eliminar um usuário existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do usuário a ser eliminada.
 *          required: true
 *          schema:
 *            type: string
 *            format: string
 *      responses:
 *        200:
 *          description: Usuário atualizado com sucesso. 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/rota'
 *        '401':
 *          description: O usuário não tem permissão para excluir o usuário.
 *        '500':
 *          description: Erro interno do servidor.
 * 
*/


router
    .get("/usuarios", AuthMiddleware, UsuarioController.listarUsuario)
    .get("/usuarios/:id", AuthMiddleware, UsuarioController.listarUsuarioId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .patch("/usuarios/:id", AuthMiddleware, UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", AuthMiddleware, UsuarioController.excluirUsuario)

export default router;