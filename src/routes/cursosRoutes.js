import express from "express";
import CursoController from "../controllers/CursoController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js"


const router = express.Router();

/**
 * @swagger
 * paths:
 *  /cursos:
 *    post: 
 *      tags:
 *        - Cursos
 *      security:
 *        - bearerAuth: [] 
 *      description: Esta função é responsável por criar um Curso no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
 *      summary: Cadastra um novo Curso
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                Módulo:
 *                  type: string
 *                  example: Equação de 1° grau
 *                descricao:
 *                  type: string
 *                  example: "Neste curso ensinarei sobre equação!"
 *                nivel:
 *                  type: string
 *                  example: Medio
 *                professor:
 *                  type: string
 *                  example: "Smolak Teacher"    
 *  
 *      responses:
 *        201:
 *          description: Curso cadastrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Cursos'
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
 *        422:
 *          description: Erro ao cadastrar o Usuário
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
 *        - Cursos
 *      summary: Lista todos os Cursos
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar um Curso existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
 *      parameters:
 *        - in: query
 *          name: Módulo
 *          schema:
 *            type: string
 *          description: Nome do Módulo para filtrar
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
 *          description: Retorna a lista de Cursos
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Cursos'
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
 *  /cursos/{id}:
 *    get:
 *      summary: Lista um Curso encontrado por ID
 *      operationId: getUsuarioPorId
 *      tags:
 *        - Cursos
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por buscar um Curso existente no banco de dados por ID, verificando previamente se o usuário tem permissão para realizar a ação.
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do Curso para filtrar
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Retorna o Curso por id
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  docs:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Cursos'
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
 *      summary: Atualiza atributos de um Curso existente no banco de dados
 *      tags:
 *        - Cursos
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por atualizar um Curso existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Cursos'
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do Curso a ser atualizado
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        201:
 *          description: Curso atualizado com sucesso 
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
 *                    example: Curso atualizado com sucesso!
 *                      
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
 *      summary: Exclui um Curso existente no banco de dados
 *      tags:
 *        - Cursos
 *      security:
 *        - bearerAuth: []
 *      description: Esta função é responsável por eliminar um cursp existente no banco de dados, verificando previamente se o usuário tem permissão para realizar a ação
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID do Curso a ser excluido
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
    .get("/cursos", AuthMiddleware, CursoController.listarCursos)
    .get("/cursos/:id", AuthMiddleware, CursoController.listarCursosPorId)
    .post("/cursos", AuthMiddleware, CursoController.cadastrarCurso)
    .patch("/cursos/:id", AuthMiddleware, CursoController.atualizarCurso)
    .delete("/cursos/:id", AuthMiddleware, CursoController.excluirCurso)


export default router;