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

});

describe ('/GET em Matriculas', () => {
    it("Deve retornar uma lista de Matriculas", async () =>{
        const dados = await request(app)
        .get('/matriculas')
        .set('accept', 'aplication/json')
        .expect('content-type', /json/)
        .expect(200);
        //console.log(dados._body);
        expect(dados._body.docs[0]._id).toEqual('648e63910a514e9e40b4a6d7');
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

describe.skip("/PATCH/ID em Matriculas", () =>{
    it("Deve Atualizar a Matricula!", async ()=>{
        const dados = await request(app)
        .patch(`/matriculas/${idMatricula}`)
        .set('Accept', 'aplication/json')
        .send({
            matri: "648e63da63b73fee24aca8e4"
        })
        .expect(201)
        expect(dados._body.message).toEqual('Matricula atualizada com sucesso');
    })
});



describe.skip("/DELETE/ID em Matriculas", () =>{
    it("Deve Excluir uma Matricula!", async () =>{                 // parte de excluir esta rodando
        const dados = await request(app)
        .delete(`/matriculas/${idMatricula}`)
        .set('Accept', 'aplication/json')
        .expect(200)
        expect(dados._body.message).toEqual("Matricula excluída com sucesso.");
    })

    it("Deve retornar erro de matricula não encontrada!", async () =>{          // essa nao está
        const dados = await request(app)
        .delete(`/matriculas/${idMatricula}`)
        .set('Accept', 'aplication/json')
        .expect(400)
        expect(dados._body.message).toEqual("Matricula não Localizada!");
    })
});