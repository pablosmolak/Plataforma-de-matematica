import express from "express"
import RotasController from "../controllers/RotasController.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js"

const router = express.Router()

/**
 * @swagger
 * paths:
 *  /rotas:
 *    post: 
 *      tags:
 *        - Rotas
 *      summary: Cadastra uma nova rota
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por criar uma Rota no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rotas'
 *      responses:
 *        201:
 *          description: Rota cadastrada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rotas'
 *        401:
 *          description: O Usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        422:
 *          description: Erro ao cadastrar a Rota
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
 *        - Rotas
 *      summary: Lista todas as rotas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por Buscar um Curso no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: query
 *          name: rota
 *          schema:
 *            type: string
 *          description: Nome da Rota para filtrar
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
 *          description: Retorna a lista de Rotas
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Rota'
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
 *  /rotas/{id}:
 *    get:
 *      summary: Rota encontrada por ID
 *      operationId: getUsuarioPorId
 *      tags:
 *        - Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por Buscar uma Rota por ID no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da Rota para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Retorna a Rota por id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Rotas'
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404: 
 *          description: Rota não encontrada
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
 *      summary: Atualiza atributos de uma Rota existente no banco de dados
 *      tags:
 *        - Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar uma Rota existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               $ref: '#/components/schemas/Rotas'                  
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da Rota a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        201:
 *          description: Rota atualizada com sucesso 
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
 *          description: Rota não encontrada
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
 *      summary: Exclui uma Rota existente no banco de dados
 *      tags:
 *        - Rotas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por excluir uma Rota existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da Rota a ser excluida
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Rota excluída com sucesso
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
 *          description: Rota não encontrada
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
    .get("/rotas", AuthMiddleware, RotasController.listarRotas)
    .get("/rotas/:id",AuthMiddleware, RotasController.listarRotaPorId)
    .post("/rotas",AuthMiddleware, RotasController.cadastrarRota)
    .patch("/rotas/:id",AuthMiddleware, RotasController.atualizarRota)
    .delete("/rotas/:id",AuthMiddleware, RotasController.excluirRota)


export default router;