import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals'
import Rotas from "../../models/Rota.js"
import RotasController from '../../controllers/RotasController.js'

describe("Deve retornar testes de unidade de Rotas", () =>{

    afterEach(() => jest.clearAllMocks())

    const objetoRota ={
        rota: "/teste",
        ativo: true,
        verbo_get: true,
        verbo_put: true,
        verbo_patch: true,
        verbo_delete: true,
        verbo_post: true 
    }

    it('Deve Instanciar uma nova Rota ', () => {
        const rota = new Rotas(objetoRota)
        expect(rota).toEqual(expect.objectContaining(objetoRota))
        expect(rota).toHaveProperty('rota', '/teste')
    })

    it('Deve retornar um Cadastro de Rotas simulado com mock', () => {
        const rota = new Rotas(objetoRota)
        RotasController.cadastrarRota = jest.fn().mockReturnValue(rota)

        const retorno = RotasController.cadastrarRota();

        expect(retorno).toEqual(expect.objectContaining({
            ativo: true
        }))
        expect(RotasController.cadastrarRota).toBeCalledTimes(1)
    })

    it("Deve retornar uma lista de Rotas simulada com mock", () =>{
        RotasController.listarRotas = jest.fn().mockReturnValue([
            {
                rota: "/teste2",
                ativo: true,
                verbo_get: true,
                verbo_put: true,
                verbo_patch: true,
                verbo_delete: true,
                verbo_post: true 
            },
            {
                rota: "/teste1",
                ativo: true,
                verbo_get: true,
                verbo_put: true,
                verbo_patch: true,
                verbo_delete: true,
                verbo_post: true 
            }
        ])

        const retorno = RotasController.listarRotas();
        expect(retorno).toHaveLength(2)
        expect(retorno[0]).toHaveProperty('rota', '/teste2')
        expect(RotasController.listarRotas).toBeCalledTimes(1)
    })

    it("Deve retornar uma Rota por id simulada com mock", () => {
        RotasController.listarRotaPorId = jest.fn().mockReturnValue(
            {
                _id: '63f969d459942abbe89a2251',  
                rota: "/teste",
                ativo: true,
                verbo_get: true,
                verbo_put: true,
                verbo_patch: true,
                verbo_delete: true,
                verbo_post: true            
            }
        )

        const retorno = RotasController.listarRotaPorId()
        expect(retorno._id).toEqual("63f969d459942abbe89a2251")
        expect(RotasController.listarRotaPorId).toBeCalledTimes(1)
    })

    it('Deve retornar atualização de Rota simulada com mock', () => {
        RotasController.atualizarRota = jest.fn().mockReturnValue({
            _id: '63f969d459942abbe89a2251',  
            rota: "/teste",
            ativo: true,
            verbo_get: true,
            verbo_put: true,
            verbo_patch: true,
            verbo_delete: true,
            verbo_post: true    
        })

        const retorno = RotasController.atualizarRota()
        expect(retorno).toHaveProperty('rota', '/teste')
        expect(RotasController.atualizarRota).toBeCalledTimes(1)
    })
})