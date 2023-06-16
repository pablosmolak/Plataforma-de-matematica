import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from "@jest/globals"
import request from "supertest"
import mongoose from "mongoose"
import app from "../../app.js"

let server
let idMatricula = false;
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

    // it("Deve retornar o erro de Usuário já cadastrado no curso", async () =>{
    //     const dados = await request(app)
    //     .post('/matriculas')
    //     .set('Accept', 'aplication/json')
    //     .send({
    //         usuario: {
    //             _id: "6476d5c8900ad134fbcd18bc",
    //         },
    //         cursos: [
    //             {
    //                 _id: "6476d5c9900ad134fbcd18d1",
    //                 situacao: "Em andamento",
    //             }
    //         ]
    //     })
    //     .expect(422)
    //     expect(dados._body.message).toEqual('Usuario já cadastrado no curso!')
    // })


});

describe ('/GET em Matriculas', () => {
    it("Deve retornar uma lista de Matriculas", async () =>{
        const dados = await request(app)
        .get('/matriculas')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        //console.log(dados._body);
        expect(dados._body.docs[0]._id).toEqual('648a626f29d11c3bce1c2ddc');
    })
});

describe('/GET/ID em Matriculas', () =>{
    it("Deve retornar uma matricula pelo id", async () => {
        const dados = await request(app)
        .get(`/matriculas/${idMatricula}`)
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        expect(dados._body._id).toEqual(idMatricula);

    })

});

describe("/PATCH/ID em Matriculas", () =>{
    it("Deve Atualizar a Matricula!", async ()=>{
        const dados = await request(app)
        .patch(`/matriculas/${idMatricula}`)
        .set('Accept', 'aplication/json')
        .send({
            usuario: {
                _id: "6476d5c8900ad134fbcd18bd",
            },
        })
        .expect(201)
        expect(dados._body.message).toEqual('Matricula atualizado com sucesso')
    })
});

describe("/DELETE/ID em Matriculas", () =>{
    it("Deve retornar erro de matricula não encontrada!", async () =>{
        const dados = await request(app)
        .delete(`/matriculas/${idMatricula}`)
        .set('Accept', 'aplication/json')
        .expect(400)
        expect(dados._body.message).toEqual("Matricula não Localizada!")
    })

    it("Deve Excluir uma Matricula!", async () =>{
        const dados = await request(app)
        .delete(`/matricula/${idMatricula}`)
        .set('Accept', 'aplication/json')
        .expect(200)
        expect(dados._body.message).toEqual("Matricula excluída com sucesso.")
    })
});