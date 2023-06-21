import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server
let token = ""

beforeEach(() => {
    const port = 3009
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

afterAll(() => {
    mongoose.connection.close()
})

describe('/POST em login', () => {
    it('Deve logar um usuario', async () =>{
        const dados = await request(app)
        .post('/login')
        .set('accept', 'aplication/json')
        .send({
            user: "dev",
            senha: "123"
        })
        .expect(200)
        
    })
})

describe ('Testando AuthMiddleware', () => {
    it("Deve retornar erro de token invalido", async () =>{
        const dados = await request(app)
        .get('/usuarios')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(498);
        expect(dados._body.message).toEqual('O token está inválido!');
    })

    describe ('Testando AuthMiddleware', () => {
        it("Deve retornar erro de token vazio", async () =>{
            const dados = await request(app)
            .get('/usuarios')
            .set('Authorization', '')
            .set('accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(498);
            expect(dados._body.message).toEqual('O token de autenticação não existe!');
        })
    })
})
