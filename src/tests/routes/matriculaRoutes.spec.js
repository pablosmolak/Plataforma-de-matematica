import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server
let idMatricula = false;
let token = false

beforeEach(() => {
    const port = 3003
    server = app.listen(port)
})

afterEach(() => {
    server.close()
})

afterAll(() => {
    mongoose.connection.close()
})

describe('/POST em Login para autenticação dos proximos testes', () => {
    it("Deve retornar o Token e as informações do Usuário", async () =>{
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

describe ('/POST em Matriculas', () => {
    it("Deve cadastrar uma Matricula", async () => {
        const dados = await request(app)
        .post('/matriculas')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
                usuario:{
                        _id: "648d47515729f7bbdaa450a5"
            },
        
                cursos:{
                        _id: "648d0c6300b48c902c6ae561",
                        situacao: "em andamento"
            }
            
        })
        .expect(201);
        idMatricula = dados._body._id;       
    })

    it("Deve retornar erro de falta de dados ao cadastrar uma Matricula", async () => {
        const dados = await request(app)
        .post('/matriculas')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
            usuario: {
            
            },
            cursos: [
                {
                    _id: "6476d5c9900ad134fbcd18d1",
                    situacao: "Em andamento"
                }
            ]
        })
        .expect(422)
        expect(dados._body.message).toEqual("Erro nos dados, confira e repita!")       
    })

})

describe ('/GET em Matriculas', () => {
    it("Deve retornar uma lista de Matriculas", async () =>{
        const dados = await request(app)
        .get('/matriculas')
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200)
    })
})

describe('/GET/ID em Matriculas', () =>{
    it("Deve retornar uma matricula pelo id", async () => {
        const dados = await request(app)
        .get(`/matriculas/${idMatricula}`)
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body._id).toEqual(idMatricula);

    })

    it("Deve retornar erro de Matrícula não encontrada", async () =>{
        const dados = await request(app)
        .get(`/matriculas/${idMatricula}a`)
        .set('Authorization', `Bearer ${token}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(404);
        expect(dados._body.message).toEqual("Matrícula não encontrada!");
    })

})

describe("/PATCH/ID em Matriculas", () =>{
    it("Deve Atualizar a Matricula!", async ()=>{
        const dados = await request(app)
        .patch(`/matriculas/${idMatricula}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({
            situacao: "Finalizado"
        })
        .expect(201)
        expect(dados._body.message).toEqual('Matricula atualizada com sucesso!');
    })

    it("Deve retornar erro de dados incorretos ao atualizar uma Matricula", async () => {
        const dados = await request(app)
        .patch(`/matriculas/${idMatricula}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .send({           
            _id: "65656565655665"
        })
        .expect(422)
        expect(dados._body.message).toEqual("Erro nos dados, confira e repita!")       
    })
})



describe("/DELETE/ID em Matriculas", () =>{
    it("Deve Excluir uma Matricula!", async () =>{                 
        const dados = await request(app)
        .delete(`/matriculas/${idMatricula}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect(200)
        expect(dados._body.message).toEqual("Matrícula excluída com sucesso!");
    })

    it("Deve retornar erro de matricula não encontrada!", async () =>{          
        const dados = await request(app)
        .delete(`/matriculas/${idMatricula}e`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'aplication/json')
        .expect(404)
        expect(dados._body.message).toEqual("Matrícula não encontrada!");
    })
})