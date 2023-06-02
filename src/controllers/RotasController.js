import rotas from "../models/Rota.js";
class RotaController {
  static listarRotas = async (req, res) => {
    try {

        const nome = req.query.nome;
        const { page, perPage } = req.query;
        const options = { // limitar a quantidade máxima por requisição
          nome: (nome),
          page: parseInt(page) || 1,
          limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
        };
        if (!nome) {
          // retorno da busca desejada
          const rota = await rotas.paginate({}, options);
          return res.json(rota);
        } else {
          const rota = await rotas.paginate({ rota: new RegExp(nome, 'i') }, options);
          return res.json(rota);
        }
      
    } catch (err) {
      // console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }
}

export default RotaController