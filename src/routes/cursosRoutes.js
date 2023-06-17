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
 *      summary: Cadastra um novo Curso
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                modulo:
 *                  type: string
 *                  example: Equação de 2° Grau
 *                nivel:
 *                  type: string
 *                  example: Médio
 *                professor:
 *                  type: string
 *                  example: Smolak
 *                aulas:
 *                  type: object
 *                  properties:
 *                    nome:
 *                      type: string
 *                      example: Aula 1 
 *                    orientação:
 *                      type: string
 *                      example: "Nessa aula é passado os conceitos iniciais da equação"
 *                    videos:
 *                      type: object
 *                      properties:
 *                        nomeArquivo:
 *                          type: string
 *                          example: Video Aula 1
 *                        descricao:
 *                          type: string
 *                          example: iniciando os conceitos
 *                        data:
 *                          type: date
 *                    exercicios:
 *                      type: object
 *                      properties:
 *                        nomeArquivo:
 *                          type: string
 *                          example: Video Aula 1
 *                        descricao:
 *                          type: string
 *                          example: iniciando os conceitos
 *                        data:
 *                          type: date
 *                    resolucoes:
 *                      type: object
 *                      properties:
 *                        nomeArquivo:
 *                          type: string
 *                          example: Video Aula 1
 *                        descricao:
 *                          type: string
 *                          example: iniciando os conceitos
 *                        data:
 *                          type: date
 *                ativo:
 *                  type: boolean
 *                  example: true    
 *      responses:
 *        201:
 *          description: Usuário cadastrado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuario'
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
 *      summary: Lista todos os usuários
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
 *      summary: Usuario encontrado por ID
 *      operationId: getUsuarioPorId
 *      tags:
 *        - Cursos
 *      security:
 *        - bearerAuth: []
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
 *      summary: Atualiza atributos de um usuário existente no banco de dados.
 *      tags:
 *        - Cursos
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
 *      summary: Exclui um usuário existente no banco de dados.
 *      tags:
 *        - Cursos
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
   .get("/cursos", CursoController.listarCursos)

export default router;