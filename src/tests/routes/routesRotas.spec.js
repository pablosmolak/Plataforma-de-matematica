import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server
let idPessoa

beforeEach(() => {
    const port = 3001
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

afterAll(() => {
    mongoose.connection.close()
})

describe ('/GET em Rotas', () => {
    it("Deve retornar uma lista de Rotas", async () =>{
        const dados = await request(app)
        .get('/rotas')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.docs[0].nome).toEqual('Dev santos');
    })
})

describe('/GET/ID em Rotas', () =>{
    it("Id da rota não localizado", async () => {
        const dados = await request(app)
        .get('/rotas/6476d5c8900ad134fbcd18bc')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.nome).toEqual('Dev santos');

    })
    it("Deve retornar erro de ID invalido", async () => {
        const dados = await request(app)
        .get('/rotas/64723ab40d64bff37ee0a0e74e4')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(400);
        expect(dados._body.message).toEqual('ID invalido ou não encontrado');
    })
})

describe ('/POST em Rotas', () => {
    it("Rota já cadastrada", async () => {
        const dados = await request(app)
        .post('/rotas')
        .set('Accept', 'aplication/json')
        .send({           
            nome: 'Ana Reis',
            user: 'reistest',
            email: 'reistest@gmail.com',
            senha: '00098761',
            telefone: '999007586'
        })
        .expect(201);
        idPessoa = dados._body._id;
        
    });

    it("Deve retornar erro 400 se faltar o campo nome", async () =>{
        const dados = await request(app)
        .post('/rotas')
        .set('Accept', 'aplication/json')
        .send({
            nome: 'Ana Reis',
            user: 'reistest1',
            email: 'reistest@gmail.com',
            senha: '00098761',
            telefone: '999007586'
        })
        .expect(422)
    })

    it("Deve retornar erro ao criar um recurso sem dados obrigatórios", async () =>{
        const dados = await request(app)
        .post('/rotas')
        .set('Accept', 'aplication/json')
        .send({
            nome: 'Ana Reis',
            user: 'reistest',
            email: 'reistest1@gmail.com',
            senha: '00098761',
            telefone: '999007586'
        })
        .expect(422)
        expect(dados._body.message).toEqual('Rotas já cadastrado!')
    })
})

describe("/DELETE/ID em Rotas", () =>{
    it("Deve Excluir uma Rota!", async () =>{
        const dados = await request(app)
        .delete('/rotas/'+ idPessoa)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        expect(dados._body.message).toEqual("Rotas excluído com sucesso.")
    })
})
