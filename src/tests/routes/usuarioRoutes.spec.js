import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server
let idUsuario
let token = false

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
        idUsuario = dados._body._id;
        
    });

describe('/POST em Login', () => {
    it("Deve retornar o Token e as informaçoes do Usuário", async () =>{
        const dados = await request(app)
        .post('/login')
        .set('accept', 'aplication/json')
        .send({
            user: "smolaktest",
            senha: "12325554"
        })
        .expect(200);
        token = dados._body.token;
    })
})

describe ('/GET em Usuários', () => {
    it("Deve retornar uma lista de Usuários", async () =>{
        const dados = await request(app)
        .get('/usuarios')
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.nome).toEqual('Dev oliveira');

    })
    it("Deve retornar erro de ID invalido", async () => {
        const dados = await request(app)
        .get('/usuarios/64723ab40d64bff37ee0a0e74e4')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(400);
        expect(dados._body.message).toEqual('ID invalido ou não encontrado');
    })
})

    it("Deve retornar erro de E-mail já cadastrado", async () =>{
        const dados = await request(app)
        .post('/usuarios')
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
        .delete(`/usuarios/${idUsuario}`)
        .set('Accept', 'aplication/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('content-type', /json/)
        expect(dados._body.message).toEqual("Usuário excluído com sucesso.")
    })
})

