import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let idCurso
let token = false


afterAll(() => {
    mongoose.connection.close()
})


describe('/POST em Login para autenticação dos proxsm tests', () => {
  it("Deve retornar o Token e as informaçoes do Usuário", async () =>{
      const dados = await request(app)
      .post('/login')
      .set('accept', 'aplication/json')
      .send({
          user: "dev",
          senha: "123"
      })
      .expect(200);
      token = dados._body.token;
  })
})

describe ('/POST em Cursos', () => {
  it("Deve cadastrar um Curso", async () => {
      const dados = await request(app)
      .post('/cursos')
      .set('Accept', 'aplication/json')
      .send({           
            'modulo': '1',
            'trim': 'primeiro',
            'nivel': '2',
            'aula' : [{
                'videos': [],
                'comentarios': 'nenhum comentario',
                'arquivos': [],
                'orientacao': 'nenhuma'
            }],
            'rotas': []
      })
      .expect(201);
      idCurso = dados._body._id;
      
  })
})

describe ('/GET em Cursos', () => {
    it("Deve retornar uma lista de Cursos", async () =>{
        const dados = await request(app)
        .get('/cursos')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.docs[i].nome).toEqual('INGLES');
    })
})
