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

      static listarRotaPorId = async (req, res) => {
  try {
    
     rotas.findById(req.params.id).exec((err, rotas) => {
        if (err) {
          return res.status(500).json({ error: true, code: 500, message: "Id da rota não localizado." })
        } else {
          res.status(200).send(rotas);
        }
      })
    }
  } catch (err) {
    // console.error(err);
    return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
  } 

  static cadastrarRota = async (req, res) => { 

   try {
      let rota = new rotas(req.body);
      // checar se a rota já existe
      const rotaExiste = await rotas.findOne({ rota: rota.rota });
      if (rotaExiste) {
        return res.status(400).json({ error: true, code: 400, message: "Rota já cadastrada." })
      }
     rotas.save((err) => {
        if (err) {
          return res.status(500).json({ error: true, code: 500, message: "Erro nos dados, confira e repita" })
        } else {
          res.status(201).send(rota.toJSON())
        }
      })
    }
  } catch (err) {
    // console.error(err);
    return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
  }
}  
    static atualizarRota = async (req, res) => {
  try {
      const id = req.params.id;
     rotas.findOneAndUpdate(id, { $set: req.body }, (err) => {
        if (!err) {
          return res.status(200).json({ code: 200, message: "Operação bem sucedida" })
        } else {
          return res.status(500).json({ error: true, code: 500, message: "Erro nos dados, confira e repita" })
        }
      }).clone().catch((err) => { console.log(err) })
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
  }
} 
static excluirRota = async (req, res) => {
  try {
      const id = req.params.id;
      rotas.findByIdAndDelete(id, (err) => {
        if (!err) {
          res.status(200).send({ message: 'Rota removida com sucesso' })
        } else {
          return res.status(500).json({ error: true, code: 500, message: "Erro nos dados, confira e repita" })
        }
      })
    }
  } catch (err) {
    // console.error(err);
    return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
  }
   }
}


export default RotaController