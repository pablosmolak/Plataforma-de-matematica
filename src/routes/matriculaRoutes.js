import express from "express"
import MatriculaController from "../controllers/MatriculaController.js"
import AuthMiddleware from "../middleware/AuthMiddleware.js"


const router = express.Router()

/**
 * @swagger
 * paths:
 *  /matriculas:
 *    post: 
 *      tags:
 *        - Matrículas
 *      summary: Cadastra uma nova Matrícula
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por criar uma Matrícula no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação      
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Matriculas'   
 *      responses:
 *        201:
 *          description: Matrícula cadastrada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Matriculas'
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        422:
 *          description: Erro ao cadastrar a Matrícula
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
 *          description: Erro interno do servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *    get:
 *      tags:
 *        - Matrículas
 *      summary: Lista todos as Matrículas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar uma lista de Matrículas existentes no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
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
 *          description: Retorna a lista de Matrículas
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Matriculas'
 *                totalDocs:
 *                  type: integer
 *                limit:
 *                  type: integer
 *                totalPages:
 *                  type: integer
 *                page:
 *                  type: integer
 *                pagingCounter:
 *                  type: integer
 *                hasPrevPage:
 *                  type: boolean
 *                hasNextPage:
 *                  type: boolean
 *                prevPage:
 *                  type: integer
 *                nextPage:
 *                  type: integer
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
 *  /matriculas/{id}:
 *    get:
 *      summary: Matrícula encontrada por ID
 *      operationId: getUsuarioPorId
 *      tags:
 *        - Matrículas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar uma Matrícula por ID existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da Matrícula para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Retorna o Matrícula por id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Matriculas'
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404: 
 *          description: Matrícula não Encontrada
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
 *      summary: Atualiza atributos de uma Matrícula existente no banco de dados
 *      tags:
 *        - Matrículas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar uma Matrícula existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Matriculas'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da Matrícula a ser atualizada
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        201:
 *          description: Matrícula atualizada com sucesso 
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 201
 *                  message:
 *                    type: string
 *                    example: Matrícula atualizada com sucesso!
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404: 
 *          description: Matrícula não encontrada
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
 *      summary: Exclui uma Matrícula existente no banco de dados.
 *      tags:
 *        - Matrículas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por excluir uma Matrícula existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID da Matrícula a ser excluída
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Matrícula excluída com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: integer
 *                    example: 201
 *                  message:
 *                    type: string
 *                    example: Matricula excluída com sucesso!
 *        401:
 *          description: O usuário não tem permissão para realizar a operação
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404:
 *          description: Matrícula não encontrada
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
    .get("/matriculas", AuthMiddleware, MatriculaController.listarMatricula)
    .get("/matriculas/:id", AuthMiddleware, MatriculaController.listarMatriculaId)
    .post("/matriculas", AuthMiddleware, MatriculaController.cadastrarMatricula)
    .patch("/matriculas/:id", AuthMiddleware, MatriculaController.atualizarMatricula)
    .delete("/matriculas/:id", AuthMiddleware, MatriculaController.excluirMatricula)

export default router;
