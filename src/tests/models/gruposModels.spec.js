import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals'
import Grupos from "../../models/Grupo.js"
import GruposController from '../../controllers/GrupoController.js'

describe("Deve retornar testes de unidade de Usuário", () =>{

    afterEach(() => jest.clearAllMocks())

    const objetoGrupos ={
        nome: 'novo grupo 2.0',
        descricao: 'esse é o novo grupo 2.0',
        ativo: true
    }

    it('Deve Instanciar um novo Grupo ', () => {
        const grupos = new Grupos(objetoGrupos)
        expect(grupos).toEqual(expect.objectContaining(objetoGrupos))
        expect(grupos).toHaveProperty('nome', 'novo grupo 2.0')
    })

    it('Deve retornar o CadastroPessoa simulado com mock', () => {
        const grupos = new Grupos(objetoGrupos)
        GruposController.cadastrarGrupo = jest.fn().mockReturnValue({
            nome: 'novo grupo 2.0',
            descricao: 'esse é o novo grupo 2.0',
            ativo: true
        })

        const retorno = GruposController.cadastrarGrupo();

        expect(retorno).toEqual(expect.objectContaining({
            nome: 'novo grupo 2.0'
        }))
        expect(GruposController.cadastrarGrupo).toBeCalledTimes(1)
    })

    it("Deve retornar uma lista de pessoa simulada com mock", () =>{
        GruposController.listarGrupos = jest.fn().mockReturnValue([
            {
                nome: 'novo grupo 2.0',
                descricao: 'esse é o novo grupo 2.0',
                ativo: true
            },
            {
                nome: 'novo grupo 23.0',
                descricao: 'esse é o novo grupo 2.0',
                ativo: true
            }
        ])

        const retorno = GruposController.listarGrupos();
        expect(retorno).toHaveLength(2)
        expect(retorno[1]).toHaveProperty('nome', 'novo grupo 23.0')
        expect(GruposController.listarGrupos).toBeCalledTimes(1)
    })

    it("Deve retornar uma pessoa por id simulada com mock", () => {
        GruposController.listarGruposId = jest.fn().mockReturnValue(
            {
                _id: '63f969d459942abbe89a2251',
                nome: 'novo grupo 2.0',
                descricao: 'esse é o novo grupo 2.0',
                ativo: true
            }
        )

        const retorno = GruposController.listarGruposId()
        expect(retorno.nome).toEqual("novo grupo 2.0")
        expect(GruposController.listarGruposId).toBeCalledTimes(1)
    })

    it('Deve retornar atualização de pessoa simulada com mock', () => {
        const grupos = new Grupos(objetoGrupos)

        GruposController.atualizarGrupos = jest.fn().mockReturnValue(grupos)

        const retorno = GruposController.atualizarGrupos()
        expect(retorno).toHaveProperty('nome', 'novo grupo 2.0')
        expect(GruposController.atualizarGrupos).toBeCalledTimes(1)
    })
})