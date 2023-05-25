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
        .expect(200)
        //const nomes = dados._body.docs[0].nome
        //console.log(nomes)
        .expect(dados._body.docs[0].nome).toContain('Pablo Smolak')
    })
})