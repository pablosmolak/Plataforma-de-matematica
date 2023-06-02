import grupos from "../models/Grupo.js";
import rotas from "../models/Rota.js";


// classe para controlar operações 
class GrupoController {
  static listarGrupos = async (req, res) => {
    try {
        const nome = req.query.nome;
        const { page, perPage } = req.query;
        const options = { // limitar a quantidade máxima por requisição
          page: parseInt(page) || 1,
          limit: parseInt(perPage) > 3 ? 3 : parseInt(perPage) || 3
        }

        if (!nome) {
          let grupo = await grupos.paginate({}, options);
          let gpo = JSON.parse(JSON.stringify(grupo));

         
          res.status(200).send(gpo);

          
        } else {
          const grupo = await grupos.paginate({ nome: new RegExp(nome, 'i') }, options);
          let gpo = JSON.parse(JSON.stringify(grupo));
          
          res.status(200).send(gpo);
        }
      } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  /*static listarGrupoPorId = async (req, res) => {
    try {
        // carregar o grupo pelo ID e recuperar 
        grupos.findById(id, async (err, grupo) => {
          if (err) {
            return res.status(400).json({ error: true, code: 400, message: "ID inválido ou não encontrado" })
          }
          if (!grupo) {
            return res.status(404).json({ error: true, code: 404, message: "Grupo não encontrado" })
          }
        }
        )
      } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static cadastrarGrupo = async (req, res) => {
    try {
      
        let grupo = new grupos(req.body);
        grupo.save((err) => {
          if (err) {
            res.status(500).send({ message: `${err.message} - falha ao cadastrar grupo.` })
          } else {
            res.status(201).send(grupo.toJSON())
          }
        })
      } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
import rotas from "../models/Rota.js";
    try {
        const id = req.params.id;
        await grupos.findByIdAndUpdate(id, { $set: req.body }, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Grupo atualizado com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        }).clone().catch((err) => { console.log(err) })
      } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static excluirGrupo = async (req, res) => {
    try {
        const id = req.params.id;
        await grupos.findByIdAndDelete(id, (err) => {
          if (!err) {
            res.status(200).send({ message: 'Grupo removido com sucesso' })
          } else {
            res.status(500).send({ message: err.message })
          }
        })
      } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }*/

}

export default GrupoController;
