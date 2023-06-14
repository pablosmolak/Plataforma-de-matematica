import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server

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

describe('/POST em login', () => {
    it('Deve logar um usuario', async () =>{
        const dados = await request(app)
        .post('/login')
        .set('accept', 'aplication/json')
        .send({
            user: "dev",
            senha: "123"
        })
        .expect(200);
    })

    it('Deve retornar erro de usuario inexistente', async () =>{
        const dados = await request(app)
        .post('/login')
        .set('accept', 'aplication/json')
        .send({
            user: "dev155555555555555555",
            senha: "123"
        })
        .expect(400)
        expect(dados._body.message).toEqual('Usuário inexistente!')
    })
})
