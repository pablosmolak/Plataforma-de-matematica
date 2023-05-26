import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server

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

describe ('/GET em Usuarios', () => {
    it("Deve Retornar uma Lista de Pessoas", async () =>{
        const dados = await request(app)
        .get('/usuarios')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.docs[0].nome).toEqual('Dev oliveira');
    })
})

describe('/GET/ID em Usuarios', () =>{
    it("Deve Retornar um Usuario pelo id", async () => {
        const dados = await request(app)
        .get('/usuarios/647018d44693478cff31b66f')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.nome).toEqual('Dev oliveira');

    })
})

describe ('/POST em Usuarios', () => {
    it.skip("Deve cadastrar um Usuario", async () => {
        const dados = await request(app)
        .post('/usuarios')
        .set('Accept', 'aplication/json')
        .send({           
            nome: 'pablo Gabriel',
            user: 'pablo21gabriel',
            email: 'pablo21@gmail.com',
            senha: '12325554',
            telefone: '984227163'
        })
        .expect(201);
        const idPessoa = dados._body._id;
        
    });
});
