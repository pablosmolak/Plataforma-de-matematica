import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server
let idMatricula
// let token = false

beforeEach(() => {
    const port = 3007
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

afterAll(() => {
    mongoose.connection.close()
})

describe ('/POST em Matriculas', () => {
    it("Deve cadastrar uma Matricula", async () => {
        const dados = await request(app)
        .post('/matriculas')
        .set('Accept', 'aplication/json')
        .send({           
            usuario: {
                _id: "6476d5c8900ad134fbcd18bc",
            },
            cursos: [
                {
                    _id: "6476d5c9900ad134fbcd18d1",
                    situacao: "Em andamento",
                }
            ]
        })
        .expect(201);
        idMatricula = dados._body._id;
        
    });

    it("Deve retornar o erro de Usuário já cadastrado no curso", async () =>{
        const dados = await request(app)
        .post('/matriculas')
        .set('Accept', 'aplication/json')
        .send({
            usuario: {
                _id: "6476d5c8900ad134fbcd18bc",
            },
            cursos: [
                {
                    _id: "6476d5c9900ad134fbcd18d1",
                    situacao: "Em andamento",
                }
            ]
        })
        .expect(422)
        expect(dados._body.message).toEqual('Usuario já cadastrado no curso!')
    })


});