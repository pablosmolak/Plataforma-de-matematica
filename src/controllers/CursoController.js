import cursos from "../models/Curso.js"
import AuthPermissao from "../middleware/AuthPermissao.js"

class CursoController {

  static listarCursos = async (req,res) => {
      try{

          if(await AuthPermissao.verificarPermissao('cursos', 'get', req, res) !== false){
              return
          }

          const modulo = req.query.modulo
          const {page, perPage} = req.query

          const options = {
              modulo: (modulo),
              page: parseInt(page) || 1,
              limit: parseInt(perPage) > 5 ? 5 : parseInt(perPage) || 5
          }

          if(!modulo){
              const curso = await cursos.paginate({}, options)
              let cursoRetorn = JSON.parse(JSON.stringify(curso))
    
              return res.json(cursoRetorn)

            }else{
              const curso = await cursos.paginate({modulo: new RegExp(modulo, 'i')}, options)
              let cursoRetorn = JSON.parse(JSON.stringify(curso))
    
              return res.json(cursoRetorn)
            }       
      }
      
      catch(err){
          //console.error(err)
          return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor"})
      }
  }

  static listarCursosPorId = async (req, res) => {
      try{

          if(await AuthPermissao.verificarPermissao('cursos', 'get', req, res) !== false){
             return
          }

          const id = req.params.id

          cursos.findById(id).then(async (curso) =>{
              //let cursoRetorn = JSON.parse(JSON.stringify(curso))

              return res.status(200).send(curso)
          })
          .catch((err)=> {
            //console.log(err)
            return res.status(404).json({ error: true, code: 404, message: "Curso não encontrado!" })

          })
          
      }catch(err){
          //console.error(err);
          return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor" })
      }
  }

  static cadastrarCurso = async (req, res) => {
    try{

        if(await AuthPermissao.verificarPermissao('cursos', 'post', req, res) !== false){
            return
        }
      
        let curso = new cursos(req.body);

        let moduloExiste = await cursos.findOne({modulo:req.body.modulo})

        if(!moduloExiste){
          
          curso.save().then(() => {
            res.status(201).send(curso.toJSON())
          })
          .catch((err) =>{
              //console.log(err)
              return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, confira e repita!" })
          })
        }else if(moduloExiste){
          return res.status(422).json({error: true, code: 422, message: "Modulo já cadastrado!" })
        }

    }catch(err){
        //console.error(err);
        return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
    }
  }

  static atualizarCurso = async (req,res) => {
      try{

          if(await AuthPermissao.verificarPermissao('cursos', 'patch', req, res) !== false){
            return
          }
          
          var id = req.params.id
          cursos.findById(id).then(async ()=>{
            let moduloExiste = await cursos.findOne({modulo:req.body.modulo})
            
            if(moduloExiste){
              return res.status(422).json({error: true, code: 422, message: "Modulo já cadastrado!" })
            }
            
            cursos.findByIdAndUpdate(id,{$set: req.body}).then(()=>{
              res.status(201).json({ code: 201, message: 'Curso atualizado com sucesso!' })
            })
            .catch((err) => {
              //console.log(err)
              return res.status(422).json({ error: true, code: 422, message: "Erro nos dados, Verifique e tente novamente!" })
            })
          })
          .catch((err)=> {
            //console.log)(err)
            return res.status(404).json({ error: true, code: 404, message: "Curso não encontrado!" })
          })
      }

      catch(err){
        //console.error(err);
        return res.status(500).json({error: true, code: 500, message: "Erro interno do Servidor" })
      }
  }
  
  static excluirCurso = async (req, res) => {
      try{
            
          if(await AuthPermissao.verificarPermissao('cursos', 'delete', req, res) !== false){
            return
          }
          
          let id = req.params.id
          
          await cursos.findById(id).then(() => {
              cursos.findByIdAndDelete(id).then(() => {
                return res.status(200).json({code: 200, message: "Curso excluído com sucesso!" })
              }) 
          })
          .catch((err)=>{
            //console.log(err)
            return res.status(404).json({error: true,code: 404, message:"Curso não Localizado!"})
          })   
      }
        
      catch(err){
          //console.error(err);
          return res.status(500).json({ error: true, code: 500, message: "Erro interno do Servidor" })
      }
  }
}

export default CursoController;