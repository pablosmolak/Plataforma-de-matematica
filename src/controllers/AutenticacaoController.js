import User from "../models/Usuario.js"
import bcript from "bcryptjs"
import jwt from "jsonwebtoken"

class AutenticacaoController {

    static logar = async (req,res) => {

        const {user, email, senha} = req.body

        const userExist = await User.findOne({ user }).select('+senha')
        

        if(userExist=="null"){
            res.status(400).json({code: 400,message: 'Usuário inexistente!'})
        }

        if(!( await bcript.compare(senha, userExist.senha))){
            res.status(400).json({code:400, message: "Usuário ou senha incorretos!"})
        }

        if(!userExist.ativo){
            res.status(400).json({code:400, message:"Usuário inativo!"})
        }

        return res.status(200).json({
            token: jwt.sign(
                {   
                    id: userExist._id,
                    nome: userExist.nome,
                    email: userExist.email,
                    user: userExist.user,
                    ativo: userExist.ativo
                },
                process.env.SECRET,
                {expiresIn: process.env.EXPIREIN}
            ),
    
            user: {
                id: userExist._id,
                nome: userExist.nome,
                email: userExist.email,
                user: userExist.user,
                ativo: userExist.ativo
            }   
        })
    }
}

export default AutenticacaoController

