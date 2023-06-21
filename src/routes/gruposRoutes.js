import express from "express"
import GrupoController from "../controllers/GrupoController.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * paths:
 *  /grupos:
 *    post: 
 *      tags:
 *        - Grupos
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por criar um Grupo no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      summary: Cadastra um novo Grupo
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Grupos' 
 *      responses:
 *        201:
 *          description: Grupo cadastrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Grupo'
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        422:
 *          description: Erro ao cadastrar o Grupo
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
 *    get:
 *      tags:
 *        - Grupos
 *      summary: Lista todos os Grupos
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar uma lista de Grupos no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: query
 *          name: Nome
 *          schema:
 *            type: string
 *          description: Nome do Grupo para filtrar
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
 *          description: Retorna a lista de Grupos
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Grupo'
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
 *                $ref: '#/components/schemas/Error'
 *        498:
 *          description: Erros de Token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        500:
 *          description: Erro Interno do Servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *  /grupos/{id}:
 *    get:
 *      summary: Grupo encontrado por ID
 *      operationId: getUsuarioPorId
 *      tags:
 *        - Grupos
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar um Grupo por ID no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação 
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do Grupo para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Retorna o Grupo por id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Grupo'
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404: 
 *          description: Grupo não encontrado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        498:
 *          description: Erros de Token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        500:
 *          description: Erro interno do Servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'              
 *    patch:
 *      summary: Atualiza atributos de um Grupo existente no banco de dados
 *      tags:
 *        - Grupos
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar um Grupo existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Grupos'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do Grupo a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        201:
 *          description: Grupo atualizado com sucesso 
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Grupo'
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        422:
 *          description: Erro ao atualizar o Grupo
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404: 
 *          description: Grupo não encontrado
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
 *      summary: Exclui um Grupo existente no banco de dados
 *      tags:
 *        - Grupos
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por excluir um Grupo existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do Grupo a ser excluido
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Grupo excluído com sucesso
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
 *          description: Grupo não encontrado
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
*/

router
    .get("/grupos", AuthMiddleware, GrupoController.listarGrupo)
    .get("/grupos/:id", AuthMiddleware, GrupoController.listarGrupoId)
    .post("/grupos", AuthMiddleware, GrupoController.cadastrarGrupo)
    .patch("/grupos/:id", AuthMiddleware, GrupoController.atualizarGrupo)
    .delete("/grupos/:id", AuthMiddleware, GrupoController.excluirGrupo)

export default router;