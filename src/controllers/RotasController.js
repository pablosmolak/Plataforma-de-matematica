import rotas from "../models/Rota.js";

class RotaController {
  static listarRotas = async (req, res) => {
    try {
      const nome = req.query.nome;
      const { page, perPage } = req.query;
      const options = {
        nome: nome ? new RegExp(nome, "i") : undefined,
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
      };
      const rota = await rotas.paginate({}, options);
      return res.json(rota);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  };

  static listarRotaPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const rota = await rotas.findById(id);
      if (!rota) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: "Rota não encontrada" });
      }
      return res.json(rota);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  };

  static cadastrarRota = async (req, res) => {
    try {
      const rota = new rotas(req.body);
      const rotaExiste = await rotas.findOne({ rota: rota.rota });
      if (rotaExiste) {
        return res
          .status(400)
          .json({ error: true, code: 400, message: "Rota já cadastrada." });
      }
       rota.save();
      return res.status(201).send(rota.toJSON());
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  };

  static atualizarRota = async (req, res) => {
    try {
      const id = req.params.id;
      const rota = await rotas.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!rota) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: "Rota não encontrada" });
      }
      return res
        .status(200)
        .json({ code: 200, message: "Operação bem sucedida" });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  };

  static excluirRota = async (req, res) => {
    try {
      const id = req.params.id;
      const rota = await rotas.findByIdAndDelete(id);
      if (!rota) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: "Rota não encontrada" });
      }
      return res
        .status(200)
        .json({ message: "Rota removida com sucesso" });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  };
}

export default RotaController;