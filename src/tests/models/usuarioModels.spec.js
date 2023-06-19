import {describe, expect, it, jest, beforeEach, afterAll, afterEach } from '@jest/globals'
import Usuario from "../../models/Usuario.js"
import UsuarioController from '../../controllers/UsuarioController.js'

describe("Deve retornar testes de unidade de Usuário", () =>{

    afterEach(() => jest.clearAllMocks())

    const objetoUsuario ={
        nome: 'Pablo Smolak',
        user: 'psmolakk',
        email: 'psmolakk@gmail.com',
        senha : '123456789',
        telefone: '984227458',
        ativo: true
    }

    it('Deve Instanciar uma nova Pessoa ', () => {
        const usuario = new Usuario(objetoUsuario)
        expect(usuario).toEqual(expect.objectContaining(objetoUsuario))
        expect(usuario).toHaveProperty('nome', 'Pablo Smolak')
    })

    it('Deve retornar o CadastroPessoa simulado com mock', () => {
        const usuario = new Usuario(objetoUsuario)
        UsuarioController.cadastrarUsuario = jest.fn().mockReturnValue({
            nome: 'Pablo Smolak',
            user: 'psmolakk',
            email: 'psmolakk@gmail.com',
            senha : '123456789',
            telefone: '984227458',
            ativo: true
        })

        const retorno = UsuarioController.cadastrarUsuario();

        expect(retorno).toEqual(expect.objectContaining({
            nome : "Pablo Smolak"
        }))
        expect(UsuarioController.cadastrarUsuario).toBeCalledTimes(1)
    })

    it("Deve retornar uma lista de pessoa simulada com mock", () =>{
        UsuarioController.listarUsuario = jest.fn().mockReturnValue([
            {
                nome: 'pedro',
                user: 'ppedro',
                email: 'ppedro@gmail.com',
                senha : '123456789',
                telefone: '984227458',
                ativo: true
            },
            {
                nome: 'Joao',
                user: 'pjao',
                email: 'pjao@gmail.com',
                senha : '123456789',
                telefone: '984227458',
                ativo: true
            }
        ])

        const retorno = UsuarioController.listarUsuario();
        expect(retorno).toHaveLength(2)
        expect(retorno[0]).toHaveProperty('nome', 'pedro')
        expect(UsuarioController.listarUsuario).toBeCalledTimes(1)
    })

    it("Deve retornar uma pessoa por id simulada com mock", () => {
        UsuarioController.listarUsuarioId = jest.fn().mockReturnValue(
            {
                _id: '63f969d459942abbe89a2251',
                nome: 'Pablo Smolak',
                user: 'psmolakk',
                email: 'psmolakk@gmail.com',
                enha : '123456789',
                telefone: '984227458',
                ativo: true
            }
        )

        const retorno = UsuarioController.listarUsuarioId()
        expect(retorno.nome).toEqual("Pablo Smolak")
        expect(UsuarioController.listarUsuarioId).toBeCalledTimes(1)
    })

    it('Deve retornar atualização de pessoa simulada com mock', () => {
        const objetoUsuarioAtualizar = {
            _id: '63f969d459942abbe89a2251',
            nome: 'Pablo Smolak',
            user: 'psmolakk',
            email: 'psmolakk@gmail.com',
            enha : '123456789',
            telefone: '984227458',
            ativo: true
    
        }

        UsuarioController.atualizarUsuario = jest.fn().mockReturnValue({
            message: 'Cadastro atualizado com sucesso'

        })

        const retorno = UsuarioController.atualizarUsuario()
        expect(retorno).toHaveProperty('message', 'Cadastro atualizado com sucesso')
        expect(UsuarioController.atualizarUsuario).toBeCalledTimes(1)
    })
})