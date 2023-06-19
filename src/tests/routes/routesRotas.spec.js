import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server
let idRota = false
let token = false

beforeEach(() => {
    const port = 3002
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

describe ('/POST em Rotas', () => {
    it("deve Cadastrar uma rota", async () => {
        const dados = await request(app)
        .post('/rotas')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            rota: "teste",
            ativo: true
        })
        .expect(201);
        idRota = dados._body._id;
        
    });

    it("Deve retornar erro de nome de Rota ja cadastrado", async () =>{
        const dados = await request(app)
        .post('/rotas')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            rota: "teste",
            ativo: true
        })
        .expect(422)
        expect(dados._body.message).toEqual("Nome de Rota informado já cadastrado!")
    })

    it("Deve retornar erro de Falta de Dados ao Cadastrar a Rotas", async () =>{
        const dados = await request(app)
        .post('/rotas')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            ativo: true
        })
        .expect(422)
        expect(dados._body.message).toEqual("Erro nos dados, confira e repita")
    })
})

describe ('/GET em Rotas', () => {
    it("Deve retornar uma lista de Rotas", async () =>{
        const dados = await request(app)
        .get('/rotas')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200)
    })

    it("Deve retornar uma lista de Rotas filtrada por nome", async () =>{
        const dados = await request(app)
        .get('/rotas?rota=usuarios')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200)
    })
})

describe('/GET/ID em Rotas', () =>{
    it("Deve retornar rota por id", async () => {
        const dados = await request(app)
        .get(`/rotas/${idRota}`)
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.rota).toEqual('teste');

    })
    it("Deve retornar erro de Rota não encontrada", async () => {
        const dados = await request(app)
        .get(`/rotas/${idRota}a`)
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(404);
        expect(dados._body.message).toEqual('Rota não encontrada!');
    })
})

describe("/PATCH/ID em Rotas", () => {
    it("Deve Atualizar uma Rota", async () =>{
        const dados = await request(app)
        .patch(`/rotas/${idRota}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            ativo: false
        })
        .expect(201)
        expect(dados._body.message).toEqual('Rota atualizada com sucesso!')
    })

    it("Deve retornar erro de nome de Rota ja cadastrado", async () =>{
        const dados = await request(app)
        .patch(`/rotas/${idRota}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            rota: "usuarios",
        })
        .expect(422)
        expect(dados._body.message).toEqual("Nome de Rota informado já cadastrado!")
    })

    it("Deve retornar erro de Id informado inexistente", async () =>{
        const dados = await request(app)
        .patch(`/rotas/${idRota}a`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            ativo: false
        })
        .expect(404)
        expect(dados._body.message).toEqual("Rota não encontrada!")
    })
})

describe("/DELETE/ID em Rotas", () =>{
    it("Deve Excluir uma Rota!", async () =>{
        const dados = await request(app)
        .delete(`/rotas/${idRota}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200)
        expect(dados._body.message).toEqual("Rota excluída com sucesso!")
    })

    it("Deve retornar erro de rota não encontrada", async () =>{
        const dados = await request(app)
        .delete(`/rotas/${idRota}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(404)
        expect(dados._body.message).toEqual("Rota não encontrada!")
    })
})
