import rotas from "../models/Rota.js";

class RotaController{

  static listarRotas = async (req, res) => {

    try {
      const nomeRota = req.query.rota
      const { page, perPage } = req.query

      const options = {
        rota: (nomeRota),
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5,
      }

      if(!nomeRota){
        const rota = await rotas.paginate({}, options)
        //let respRota = JSON.parse(JSON.stringify(rota))

        return res.json(rota)
      }else{
        const rota = await rotas.paginate({rota: new RegExp(nomeRota, 'i')}, options)
        //let RespRota = JSON.parse(JSON.stringify(rota))

        return res.json(rota)
      }

    } catch (err) {
        //console.error(err);
        return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor!"});
    }
  }

  static listarRotaPorId = async (req, res) => {
    try {

        const id = req.params.id;

        rotas.findById(id).then(async (rota) => {
            //let RespRota = JSON.parse(JSON.stringify(rota))
            return res.status(200).send(rota)
        })
        .catch((err) => {
          //console.log(err)
          return res.status(404).json({error: true, code: 404, message: "Rota não encontrada!"})
        })
    } 
    
    catch (err) {
      //console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor!" });
    }
  }

  static cadastrarRota = async (req, res) => {
    try {
      const rota = new rotas(req.body);
      const rotaExiste = await rotas.findOne({ rota: rota.rota })

      if (rotaExiste) {
        return res.status(400).json({ error: true, code: 400, message: "Rota já cadastrada." });
      }
      rota.save().then(() => {
          return res.status(201).send(rota.toJSON());
      })
      .catch((err) => {
          //console.log(err)
          return res.status(500).json([{error: true, code: 500, message: "Erro nos dados, confira e repita" }]) 
      })
      
    }
    
    catch (err) {
      //console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static atualizarRota = async (req, res) => {
    try{
        var id = req.params.id;
        var nomeRotaExiste = await rotas.findOne({rota:req.body.rota})

        if(nomeRotaExiste){
          return res.status(422).json({error: true,code: 422, message: "Nome de Rota informado já cadastrado!" })
        }

        rotas.findByIdAndUpdate(id, {$set: req.body}).then(() =>{
          res.status(201).json([{ code: 201, message: 'Rota atualizada com sucesso!'}])
        })
        .catch((err) =>{
          console.log(err)
          return res.status(500).json([{ error: true, code: 500, message: "Erro nos dados, confira e repita" }])
        })
    } 

    catch(err){
        console.error(err);
        return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }

  static excluirRota = async (req, res) => {
    try {
      let id = req.params.id
      const rota = await rotas.findById(id)

      if (!rota) {
        return res.status(404).json({ error: true, code: 404, message: "Rota não encontrada!" });
      }

      rotas.findByIdAndDelete(id).then(() => {
        return res.status(200).json({code: 200, message: "Rota excluída com sucesso!" });
      })
      .catch((err) => {
        //console.log(err)
      })
    } 
    
    catch(err){
      //console.error(err)
      return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor" });
    }
  }
}

export default RotaController;