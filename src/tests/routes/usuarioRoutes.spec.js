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
        expect(dados._body.message).toEqual('E-mail já cadastrado!')
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

    it("Deve retornar erro de senha menor que 8 caracteres", async () =>{
        const dados = await request(app)
        .post('/usuarios')
        .set('Accept', 'aplication/json')
        .send({
            nome: 'Pablo Smolak',
            user: 'smolaktest1',
            email: 'smolaktest1@gmail.com',
            senha: '12325',
            telefone: '984227163'
        })
        .expect(422)
        expect(dados._body.message).toEqual('Senha informada menor que 8 caracteres!')
    })

    it("Deve retornar erro de falta de dados no cadastro de Usuário", async () =>{
        const dados = await request(app)
        .post('/usuarios')
        .set('Accept', 'aplication/json')
        .send({
            user: 'smolaktest1',
            email: 'smolaktest1@gmail.com',
            senha: '12325554',
            telefone: '984227163'
        })
        .expect(422)
        expect(dados._body.message).toEqual('Erro nos dados, confira e repita!')
    })
})

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
        expect(dados._body.docs[0].nome).toEqual('Dev Oliveira');
    })

    it("Deve retornar um Usuário filtrado pelo nome", async () =>{
        const dados = await request(app)
        .get('/usuarios?nome=dev')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.docs[0].nome).toEqual('Dev Oliveira');
    })
})


describe('/GET/ID em Usuários', () =>{
    it("Deve retornar um Usuário pelo id", async () => {
        const dados = await request(app)
        .get(`/usuarios/${idUsuario}`)
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body.nome).toEqual('Pablo Smolak');

    })
    it("Deve retornar erro de ID invalido", async () => {
        const dados = await request(app)
        .get('/usuarios/64723ab40d64bff37ee0a0e74e4')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(404);
        expect(dados._body.message).toEqual('Usuário não encontrado!');
    })
})



describe("/PATCH/ID em Usuários", () =>{
    it("Deve Atualizar um Usuário!", async ()=>{
        const dados = await request(app)
        .patch(`/usuarios/${idUsuario}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            user: 'smolakinhotest'
        })
        .expect(201)
        expect(dados._body.message).toEqual('Usuário atualizado com sucesso!')
    })

    it("Deve retornar erro de E-mail já cadastrado", async () =>{
        const dados = await request(app)
        .patch(`/usuarios/${idUsuario}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            email: 'smolaktest@gmail.com',
        })
        .expect(422)
    })

    it("Deve retornar erro de User Name já cadastrado", async () =>{
        const dados = await request(app)
        .patch(`/usuarios/${idUsuario}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            user: 'smolakinhotest',
        })
        .expect(422)
        expect(dados._body[0].message).toEqual('Usuario já cadastrado!')
    })

    it("Deve retornar erro de senha menor que 8 caracteres", async () =>{
        const dados = await request(app)
        .patch(`/usuarios/${idUsuario}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            nome: 'Pablo Smolak',
            user: 'smolaktest1',
            email: 'smolaktest1@gmail.com',
            senha: '12325',
            telefone: '984227163'
        })
        .expect(422)
        expect(dados._body[0].message).toEqual('Senha informada menor que 8 caracteres!')
    })

    it("Deve retornar erro de falta de dados no cadastro de Usuário", async () =>{
        const dados = await request(app)
        .patch(`/usuarios/${idUsuario}e`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            nome: 'Pablo Smolak',
            user: 'smolaktest1',
            email: 'smolaktest1@gmail.com',
            senha: '1232511111',
            telefone: '984227163'
        })
        .expect(404)
        expect(dados._body.message).toEqual('Usuário não encontrado!')
    })
})

describe("/DELETE/ID em Usuários", () =>{
    it("Deve retornar erro de usuário não encontrado!", async () =>{
        const dados = await request(app)
        .delete(`/usuarios/${idUsuario}d`)
        .set('Accept', 'aplication/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('content-type', /json/)
        .expect(404)
        expect(dados._body.message).toEqual("Usuário não encontrado!")
    })

    it("Deve Excluir um Usuário!", async () =>{
        const dados = await request(app)
        .delete(`/usuarios/${idUsuario}`)
        .set('Accept', 'aplication/json')
        .set('Authorization', `Bearer ${token}`)
        .expect('content-type', /json/)
        .expect(200)
        expect(dados._body.message).toEqual("Usuário excluído com sucesso!")
    })
})

