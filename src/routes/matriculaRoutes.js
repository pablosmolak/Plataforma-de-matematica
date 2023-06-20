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
 *      description: Esta função é responsável por criar um Curso no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.       
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
 *          description: Matricula cadastrada com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Matriculas'
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
 *                 $ref: '#/components/schemas/Error'
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
 *          description: Retorna a lista de Matrículas
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
 *          description: O usuário não tem permissão para realizar a operação.
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
 *  /matriculas/{id}:
 *    get:
 *      summary: Matrícula encontrada por ID
 *      operationId: getUsuarioPorId
 *      tags:
 *        - Matrículas
 *      security:
 *        - bearerAuth: []
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
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Usuario'
 *        401:
 *          description: O usuário não tem permissão para realizar a operação.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Error'
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
 *          description: Erro interno do Servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'              
 *    patch:
 *      summary: Atualiza atributos de uma Matrícula existente no banco de dados.
 *      tags:
 *        - Matrículas
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
 *          description: O usuário não tem permissão para realizar a operação.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Error'
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
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Error'
 *    delete:
 *      summary: Exclui uma Matrícula existente no banco de dados.
 *      tags:
 *        - Matrículas
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por eliminar um usuário existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
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
 *          description: O usuário não tem permissão para realizar a operação.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Error'
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
