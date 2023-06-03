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

describe ('/GET em Usuários', () => {
    it("Deve retornar uma lista de Usuários", async () =>{
        const dados = await request(app)
        .get('/usuarios')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.docs[0].nome).toEqual('Dev oliveira');
    })
})

describe('/GET/ID em Usuários', () =>{
    it("Deve retornar um Usuário pelo id", async () => {
        const dados = await request(app)
        .get('/usuarios/6476d5c8900ad134fbcd18bc')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.nome).toEqual('Dev oliveira');

    })
    it("Deve retornar erro de ID invalido", async () => {
        const dados = await request(app)
        .get('/usuarios/64723ab40d64bff37ee0a0e74e4')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(400);
        expect(dados._body.message).toEqual('ID invalido ou não encontrado');
    })
})

describe ('/POST em Usuários', () => {
    it("Deve cadastrar um Usuário", async () => {
        const dados = await request(app)
        .post('/usuarios')
        .set('Accept', 'aplication/json')
        .send({           
            nome: 'Pablo Smolak',
            user: 'smolaktest',
            email: 'smolaktest@gmail.com',
            senha: '12325554',
            telefone: '984227163'
        })
        .expect(201);
        idPessoa = dados._body._id;
        
    });

    it("Deve retornar erro de E-mail já cadastrado", async () =>{
        const dados = await request(app)
        .post('/usuarios')
        .set('Accept', 'aplication/json')
        .send({
            nome: 'Pablo Smolak',
            user: 'smolaktest1',
            email: 'smolaktest@gmail.com',
            senha: '12325554',
            telefone: '984227163'
        })
        .expect(422)
    })

    it("Deve retornar erro de User Name já cadastrado", async () =>{
        const dados = await request(app)
        .post('/usuarios')
        .set('Accept', 'aplication/json')
        .send({
            nome: 'Pablo Smolak',
            user: 'smolaktest',
            email: 'smolaktest1@gmail.com',
            senha: '12325554',
            telefone: '984227163'
        })
        .expect(422)
        expect(dados._body.message).toEqual('Usuario já cadastrado!')
    })
})

describe("/DELETE/ID em Usuários", () =>{
    it("Deve Excluir um Usuário!", async () =>{
        const dados = await request(app)
        .delete('/usuarios/'+ idPessoa)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        expect(dados._body.message).toEqual("Usuário excluído com sucesso.")
    })
})

