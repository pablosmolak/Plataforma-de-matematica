import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals'
import Curso from "../../models/Curso.js"
import CursoController from '../../controllers/CursoController.js'

describe("Deve retornar testes de unidade de Curso", () =>{

    afterEach(() => jest.clearAllMocks())

    const objetoCurso ={
        modulo: "Equação de 2° Grau",
        descricao: "curso sobre equação de 2° grau",
        nivel: "Medio",
        professor: "Smolakinho"
    }

    it('Deve Instanciar um novo Curso ', () => {
        const curso = new Curso(objetoCurso)
        expect(curso).toEqual(expect.objectContaining(objetoCurso))
        expect(curso).toHaveProperty('modulo', 'Equação de 2° Grau')
    })

    it('Deve retornar o CadastroCurso simulado com mock', () => {
        const curso = new Curso(objetoCurso)
        CursoController.cadastrarCurso = jest.fn().mockReturnValue({
            modulo: "Equação de 2° Grau",
            descricao: "curso sobre equação de 2° grau",
            nivel: "Medio",
            professor: "Smolakinho"
        
        })

        const retorno = CursoController.cadastrarCurso();

        expect(retorno).toEqual(expect.objectContaining({
            modulo: "Equação de 2° Grau"
        }))
        expect(CursoController.cadastrarCurso).toBeCalledTimes(1)
    })

    it("Deve retornar uma lista de curso simulada com mock", () =>{
        CursoController.listarCurso = jest.fn().mockReturnValue([
            {
                modulo: "Equação de 2° Grau",
                descricao: "curso sobre equação de 2° grau",
                nivel: "Medio",
                professor: "Smolakinho"
            },
            {
                modulo: "Equação de 1° Grau",
                descricao: "curso sobre equação de 1° grau",
                nivel: "Medio",
                professor: "Smolakinho"
            }
        ])

        const retorno = CursoController.listarCurso();
        expect(retorno).toHaveLength(2)
        expect(retorno[0]).toHaveProperty('nivel', 'Medio')
        expect(CursoController.listarCurso).toBeCalledTimes(1)
    })

    it("Deve retornar um curso por id simulada com mock", () => {
        CursoController.listarCursoId = jest.fn().mockReturnValue(
            {
                _id: '63f969d459942abbe89a2251',  
                modulo: "Equação de 2° Grau",
                descricao: "curso sobre equação de 2° grau",
                nivel: "Medio",
                professor: "Smolakinho"
                
            }
        )

        const retorno = CursoController.listarCursoId()
        expect(retorno.modulo).toEqual("Equação de 2° Grau")
        expect(CursoController.listarCursoId).toBeCalledTimes(1)
    })

    it('Deve retornar atualização de curso simulada com mock', () => {
        CursoController.atualizarCurso = jest.fn().mockReturnValue({
            _id: '63f969d459942abbe89a2251',  
            modulo: "Equação de 2° Grau",
            descricao: "curso sobre equação de 2° grau",
            nivel: "Medio",
            professor: "Smolakinho"
        })

        const retorno = CursoController.atualizarCurso()
        expect(retorno).toHaveProperty('modulo', 'Equação de 2° Grau')
        expect(CursoController.atualizarCurso).toBeCalledTimes(1)
    })
})
