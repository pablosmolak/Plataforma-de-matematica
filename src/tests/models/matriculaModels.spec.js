import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals'
import Matricula from "../../models/Matricula.js"
import MatriculaController from '../../controllers/MatriculaController.js'

describe("Deve retornar testes de unidade de Matricula", () =>{

    afterEach(() => jest.clearAllMocks())

    const objetoMatricula ={
        
        usuario: {
            _id: "648cd5b783856695f7f92523"
        },
        cursos: [
            {
                _id: "648cd5b783856695f7f9252f",
                situacao: "em andamento",
                ativo: true
            }
        ]
    }

    /*it('Deve Instanciar uma nova Matricula ', () => {
        const matricula = new Matricula(objetoMatricula)
        // expect(matricula).toEqual(expect.objectContaining(objetoMatricula))
        expect(matricula).toHaveProperty(objetoMatricula.cursos[0].situacao, 'em andamento')
    })

    it('Deve retornar o CadastroMatricula simulado com mock', () => {
        const matricula = new Matricula(objetoMatricula) 
        MatriculaController.cadastrarMatricula = jest.fn().mockReturnValue(matricula)

        const retorno = MatriculaController.cadastrarMatricula();

        expect(retorno).toEqual(expect.objectContaining({
            usuario: {_id: "648cd5b783856695f7f92523"}
        }))
        expect(MatriculaController.cadastrarMatricula).toBeCalledTimes(1)
    })*/

    it("Deve retornar uma lista de matricula simulada com mock", () =>{
        MatriculaController.listarMatricula = jest.fn().mockReturnValue([
            {
                usuario: {
                    _id: "648cd5b783856695f7f92523"
                },
                cursos: [
                {
                    _id: "648cd5b783856695f7f9252f",
                    situacao: "em andamento",
                    dataInicio: "2023-06-21T06:35:46.326Z",
                    ativo: true
                }]
            },
            {
                usuario: {
                    _id: "648cd5b783856695f7f92522"
                },
                cursos: [
                {
                _id: "648cd5b783856695f7f9252f",
                situacao: "em andamento",
                dataInicio: "2023-06-21T06:35:46.326Z",
                ativo: true
                }]
            }
        ])

        const retorno = MatriculaController.listarMatricula();
        expect(retorno).toHaveLength(2)
        expect(retorno[0]).toHaveProperty('usuario', {_id: "648cd5b783856695f7f92523"})
        expect(MatriculaController.listarMatricula).toBeCalledTimes(1)
    })

    it("Deve retornar um matricula por id simulada com mock", () => {
        MatriculaController.listarMatriculaId = jest.fn().mockReturnValue(
            {
                usuario: {
                    _id: "648cd5b783856695f7f92523"
                },
                cursos: [
                    {
                        _id: "648cd5b783856695f7f9252f",
                        situacao: "em andamento",
                        dataInicio: "2023-06-21T06:35:46.326Z",
                        ativo: true
                    }
                ]
            }
        )       
    

        const retorno = MatriculaController.listarMatriculaId()
        expect(retorno.usuario).toEqual({"_id": "648cd5b783856695f7f92523"})
        expect(MatriculaController.listarMatriculaId).toBeCalledTimes(1)
    })

    it('Deve retornar atualização de matricula simulada com mock', () => {
        MatriculaController.atualizarMatricula = jest.fn().mockReturnValue({ativo: false})

        const retorno = MatriculaController.atualizarMatricula()
        expect(retorno).toHaveProperty('ativo', false)
        expect(MatriculaController.atualizarMatricula).toBeCalledTimes(1)
    })
})