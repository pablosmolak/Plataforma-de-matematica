import { describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"


let server
let idGrupo = false
let token = false

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

describe('/POST em Login para autenticação dos proximos testes', () => {
    it("Deve retornar o Token e as informaçoes do Usuário", async () =>{
        const dados = await request(app)
        .post('/login')
        .set('accept', 'aplication/json')
        .send({
            user: "dev",
            senha: "123"
        })
        .expect(200);
        token = dados._body.token;
    })
})

describe('/POST em Grupos', () => {
    it("Deve cadastrar um Grupo", async () => {
        const dados = await request(app)
            .post('/grupos')
            .set('Authorization', `Bearer ${token}`)
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
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send({
                nome: 'Novo Grupo',
                descricao: 'Descrição do novo grupo'
            })
            .expect(422)
        expect(dados._body.message).toEqual('Nome de Grupo já cadastrado!')
    })

    it("Deve retornar erro de falta de dados ao cadastrar o Grupo", async () => {
        const dados = await request(app)
            .post('/grupos')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send({
                descricao: 'Descrição do novo grupo'
            })
            .expect(422)
        expect(dados._body.message).toEqual('Erro nos dados, confira e repita!')
        })


})

describe('/GET em Grupos', () => { 
    it("Deve retornar uma lista de Grupos", async () => {
        const dados = await request(app)
        .get('/grupos')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'application/json')
        .expect('content-type', /json/)
        .expect(200)
    })

    it("Deve retornar uma lista de Grupos filtrada por nome", async () => {
        const dados = await request(app)
        .get('/grupos?nome=alunos')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'application/json')
        .expect('content-type', /json/)
        .expect(200)
    })
})


describe('/GET/ID em Grupos', () => { 
    it("Deve retornar um Grupos por Id", async () => {
        const dados = await request(app)
        .get(`/grupos/${idGrupo}`)
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'application/json')
        .expect('content-type', /json/)
        .expect(200)
        expect(dados._body.nome).toEqual('Novo Grupo')
    })

    it("Deve retornar erro de Grupos não encontrado", async () => {
        const dados = await request(app)
        .get(`/grupos/${idGrupo}a`)
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'application/json')
        .expect('content-type', /json/)
        .expect(404)
        expect(dados._body.message).toEqual('Grupo não encontrado!')
    })
})

describe("/PATCH/ID em Grupos", () =>{
    it("Deve Atualizar um Grupo", async () =>{
        const dados = await request(app)
        .patch(`/grupos/${idGrupo}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            nome: 'Novo grupo 2 '
        })
        .expect(201)
        expect(dados._body.message).toEqual('Grupo atualizado com sucesso!')
    })
    it("Deve retornar erro de Grupo não encontrado", async () =>{
        const dados = await request(app)
        .patch(`/grupos/${idGrupo}e`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            nome: 'Novo grupo 2 '
        })
        .expect(404)
        expect(dados._body.message).toEqual('Grupo não encontrado!')
    })
})

describe("/DELETE/ID em Grupos", () =>{
    it("Deve Excluir um Grupo!", async () =>{
        const dados = await request(app)
        .delete(`/grupos/${idGrupo}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200)
        expect(dados._body.message).toEqual('Grupo excluído com sucesso!')
    })

    it("Deve Excluir um Grupo!", async () =>{
        const dados = await request(app)
        .delete(`/grupos/${idGrupo}e`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(404)
        expect(dados._body.message).toEqual('Grupo não encontrado!')
    })
})







