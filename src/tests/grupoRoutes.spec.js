import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../app.js"


let server
let idGrupo

beforeEach(() => {
    const port = 3006
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

afterAll(() => {
    mongoose.connection.close()
})


describe('/GET em listarGrupo', () => { // Linha adicionada
    it("Deve retornar uma lista de Grupos id", async () => {
        const dados = await request(app)
            .get('/grupos')
            .set('accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200)
        expect(dados.body.docs[0].nome).toEqual('Administrador')
    })
})

describe('/POST em Grupos', () => {
    it("Deve cadastrar um Grupo", async () => {
        const dados = await request(app)
            .post('/grupos')
            .set('Accept', 'application/json')
            .send({
                nome: 'Novo Grupo',
                descricao: 'Descrição do novo grupo'
            })
            .expect(201)
            idGrupo = dados.body._id
        })
        

    it("Deve retornar erro de Nome de Grupo já cadastrado", async () => {
        const dados = await request(app)
            .post('/grupos')
            .set('Accept', 'application/json')
            .send({
                nome: 'Novo Grupo',
                descricao: 'Descrição do novo grupo'
            })
            .expect(422)
        expect(dados.body.message).toEqual('Nome de Grupo já cadastrado!')
        })

})
describe('/GET em Grupos', () => {
    it("Deve retornar uma lista de Grupos", async () => {
        const dados = await request(app)
            .get('/grupos')
            .set('accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200)
        expect(dados.body.docs[0].nome).toEqual('Administrador')
    })
})

describe('/GET em Grupos_id', () => {
    it("Deve retornar uma lista de Grupos id", async () => {
        const dados = await request(app)
            .get('/grupos')
            .set('accept', 'application/json')
            .expect('content-type', /json/)
            .expect(200)
        expect(dados.body.docs[0].nome).toEqual('Administrador')
    })
})



describe("/DELETE/ID em Grupos", () =>{
    it("Deve Excluir um Grupo!", async () =>{
        const dados = await request(app)
            .delete('/grupos/'+ idGrupo)
            .set('Accept', 'aplication/json')
            .expect('content-type', /json/)
            .expect(200)
        expect(dados._body.message).toEqual('Grupo excluído com sucesso!')
    })
})







