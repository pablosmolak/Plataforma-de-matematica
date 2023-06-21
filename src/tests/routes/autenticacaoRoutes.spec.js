import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server

beforeEach(() => {
    const port = 3005
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
            user: "dev1",
            senha: "123"
        })
        .expect(404)
        expect(dados._body.message).toEqual('Usuário inexistente!')
    })

    it('Deve retornar erro de usuario usuario ou senha incorretos', async () =>{
        const dados = await request(app)
        .post('/login')
        .set('accept', 'aplication/json')
        .send({
            user: "dev",
            senha: "1234"
        })
        .expect(400)
        expect(dados._body.message).toEqual('Usuário ou senha incorretos!')
    })

    it('Deve retornar erro de usuário inativo', async () =>{
        const dados = await request(app)
        .post('/login')
        .set('accept', 'aplication/json')
        .send({
            user: "Siniti.Batista",
            senha: "123"
        })
        .expect(400)
        expect(dados._body.message).toEqual('Usuário inativo!')
    })
})
