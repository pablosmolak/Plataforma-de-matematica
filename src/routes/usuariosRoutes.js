import express from "express"
import UsuarioController from "../controllers/UsuarioController.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * paths:
 *  /usuarios:
 *    post: 
 *      tags:
 *        - Usuários
 *      description: Esta função é responsável por criar um Usuário
 *      summary: Cadastra um novo Usuário
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nome:
 *                  type: string
 *                  example: Pablo Smolak
 *                user:
 *                  type: string
 *                  example: smolak.dev
 *                email:
 *                  type: string
 *                  example: smolak.dev@gmail.com
 *                senha:
 *                  type: string
 *                  example: 80028922
 *                telefone:
 *                  type: sting
 *                  example: 984227163   
 *      responses:
 *        201:
 *          description: Usuário cadastrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuario'
 *        422:
 *          description: Erro ao cadastrar o Usuário
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        500:
 *          description: Erro interno do servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *    get:
 *      tags:
 *        - Usuários
 *      summary: Lista todos os Usuários
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar umalista de Usuários existentes no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: query
 *          name: Nome
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
 *          description: Retorna a lista de Usuários
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
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Error'
 *        498:
 *          description: Erros de Token
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Error'
 *        500:
 *          description: Erro Interno do Servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *  /usuarios/{id}:
 *    get:
 *      summary: Lista um Usuário encontrado por ID
 *      operationId: getUsuarioPorId
 *      tags:
 *        - Usuários
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar um Usuário por ID no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do usuário para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Retorna o Usuario por id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuario'
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404: 
 *          description: Usuário não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        498:
 *          description: Erros de Token
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Error'
 *        500:
 *          description: Erro interno do Servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'              
 *    patch:
 *      summary: Atualiza atributos de um Usuário existente no banco de dados
 *      tags:
 *        - Usuários
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar um Usuário existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Usuario'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do Usuário a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        201:
 *          description: Usuário atualizado com sucesso 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Usuario'
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404: 
 *          description: ID inválido ou não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        498:
 *          description: Erros de Token
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Error'
 *        500:
 *          description: Erro interno do servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *    delete:
 *      summary: Exclui um Usuário existente no banco de dados
 *      tags:
 *        - Usuários
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por excluir um Usuário existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do Usuário a ser excluido
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Usuário excluído com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                  message:
 *                    type: string
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404:
 *          description: Usuário não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        498:
 *          description: Erros de Token
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Error'
 *        500:
 *          description: Erro interno do servidor.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
*/


router
    .get("/usuarios", AuthMiddleware, UsuarioController.listarUsuario)
    .get("/usuarios/:id", AuthMiddleware, UsuarioController.listarUsuarioId)
    .post("/usuarios", UsuarioController.cadastrarUsuario)
    .patch("/usuarios/:id", AuthMiddleware, UsuarioController.atualizarUsuario)
    .delete("/usuarios/:id", AuthMiddleware, UsuarioController.excluirUsuario)

export default router;