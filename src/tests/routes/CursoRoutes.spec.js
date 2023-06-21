import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server
let idCurso = false
let token = false

beforeEach(() => {
    const port = 3004
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

afterAll(() => {
    mongoose.connection.close()
})


describe('/POST em Login para autenticação dos proximos testes', () => {
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
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
                "modulo": "Equação de 2° Grau",
                "descricao": "curso sobre equação de 2° grau",
                "nivel": "Medio",
                "professor": "Smolakinho"
        })
        .expect(201);
        idCurso = dados._body._id;
        
    })

    it("Deve Retornar erro de Modulo ja cadastrado", async () => {
        const dados = await request(app)
        .post('/cursos')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
            "modulo": "Equação de 2° Grau",
            "descricao": "curso sobre equação de 2° grau",
            "nivel": "Medio",
            "professor": "Smolakinho"
        })
        .expect(422);
        expect(dados._body.message).toEqual('Modulo já cadastrado!')
    })

    it("Deve Retornar erro de Modulo ja cadastrado", async () => {
        const dados = await request(app)
        .post('/cursos')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
            "modulo": "Equação de 1° Grau",
            "nivel": "Medio",
            "professor": "Smolakinho"
        })
        .expect(422);
        expect(dados._body.message).toEqual('Erro nos dados, confira e repita!')
    })
})

describe ('/GET em Cursos', () => {
    it("Deve retornar uma lista de Cursos", async () =>{
        const dados = await request(app)
        .get('/cursos')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200)
        expect(dados._body.docs[0].modulo).toEqual('Equação de 3° Grau');
    })

    it("Deve retornar uma lista de Cursos filtrada por modulo", async () =>{
        const dados = await request(app)
        .get('/cursos?modulo=equação')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200)
    })
})

describe ('/GET/ID em Cursos', () => {
    it("Deve retornar uma Curso por Id", async () =>{
        const dados = await request(app)
        .get(`/cursos/${idCurso}`)
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200)
        expect(dados._body.modulo).toEqual('Equação de 2° Grau');
    })

    it("Deve retornar uma lista de Cursos filtrada por modulo", async () =>{
        const dados = await request(app)
        .get('/cursos?modulo=equação')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200)
    })
})

describe ('/PATCH em Cursos', () => {
    it("Deve atualizar um Curso", async () => {
        const dados = await request(app)
        .patch(`/cursos/${idCurso}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
                "modulo": "Equação de 1° Grau",
        })
        .expect(201)
        expect(dados._body.message).toEqual('Curso atualizado com sucesso!')
    })

    it("Deve retornar erro de Curso não encontrado", async () => {
        const dados = await request(app)
        .patch(`/cursos/${idCurso}a`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
                "modulo": "Equação de 4° Grau",
        })
        .expect(404)
        expect(dados._body.message).toEqual('Curso não encontrado!')
    })

    it("Deve retornar erro de modulo já cadastrado", async () => {
        const dados = await request(app)
        .patch(`/cursos/${idCurso}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
                "modulo": "Equação de 3° Grau",
        })
        .expect(422)
        expect(dados._body.message).toEqual('Modulo já cadastrado!')
    })
})

describe("/DELETE/ID em Cursos", () =>{
    it("Deve Excluir um Curso!", async () =>{
        const dados = await request(app)
        .delete(`/cursos/${idCurso}`)
        .set('Accept', 'aplication/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('content-type', /json/)
        .expect(200)
        expect(dados._body.message).toEqual("Curso excluído com sucesso!")
    })
    it("Deve retornar erro de Curso não encontrado!", async () =>{
        const dados = await request(app)
        .delete(`/cursos/${idCurso}s`)
        .set('Accept', 'aplication/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('content-type', /json/)
        .expect(404)
        expect(dados._body.message).toEqual("Curso não Localizado!")
    })
})
