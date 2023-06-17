import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals'
import Curso from "../../models/Curso.js"
import CursoController from '../../controllers/CursoController.js'

const cursoFactory = {

}

describe("Deve retornar testes de unidade de curso", () =>{

    afterEach(() => jest.clearAllMocks())

    const objetoCurso ={
        modulo: '1',
        trim: 'primeiro',
        nivel: '2',
        aula : 'matematica'
    }

    it('Deve Instanciar um novo Curso ', () => {
        const curso = new Curso(objetoCurso)
        expect(curso).toEqual(expect.objectContaining(objetoCurso))
        expect(curso).toHaveProperty('curso', 'matematica')
    })

    it('Deve retornar o CadastroCurso simulado com mock', () => {
        const curso = new Curso(objetoCurso)
        CursoController.cadastrarCurso = jest.fn().mockReturnValue({
            modulo: '1',
            trim: 'primeiro',
            nivel: '2',
            aula : 'matematica',
            ativo: true
        })

        const retorno = CursoController.cadastrarCurso();

        expect(retorno).toEqual(expect.objectContaining({
            nome : "matematica"
        }))
        expect(CursoController.cadastrarCurso).toBeCalledTimes(1)
    })

    it("Deve retornar uma lista de curso simulada com mock", () =>{
        CursoController.listarCurso = jest.fn().mockReturnValue([
            {
                modulo: '2',
                trim: 'segundo',
                nivel: '5',
                aula : 'portugues',
                ativo: true
            },
            {
                modulo: '3',
                trim: 'terceiro',
                nivel: '2',
                aula : 'ingles',
                ativo: true
            }
        ])

        const retorno = CursoController.listarCurso();
        expect(retorno).toHaveLength(2)
        expect(retorno[0]).toHaveProperty('curso', 'ingles')
        expect(CursoController.listarCurso).toBeCalledTimes(1)
    })

    it("Deve retornar um curso por id simulada com mock", () => {
        CursoController.listarCursoId = jest.fn().mockReturnValue(
            {
                _id: '63f969d459942abbe89a2251',
                modulo: '2',
                trim: 'segundo',
                nivel: '5',
                aula : 'portugues',
                ativo: true
            }
        )

        const retorno = CursoController.listarCursoId()
        expect(retorno.curso).toEqual("Matematica")
        expect(CursoController.listarCursoId).toBeCalledTimes(1)
    })

    it('Deve retornar atualização de curso simulada com mock', () => {
        const objetoCursoAtualizar = {
            _id: '63f969d459942abbe89a2251',
            modulo: '2',
            trim: 'segundo',
            nivel: '5',
            aula : 'portugues',
            ativo: true
    
        }

        CursoController.atualizarCurso = jest.fn().mockReturnValue({
            message: 'Cadastro atualizado com sucesso'

        })

        const retorno = CursoController.atualizarUsuario()
        expect(retorno).toHaveProperty('message', 'Cadastro atualizado com sucesso')
        expect(CursoController.atualizarCurso).toBeCalledTimes(1)
    })
})
