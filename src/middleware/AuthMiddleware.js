import  jwt from "jsonwebtoken"
import { promisify } from "util"

const AuthMiddleware = async (req, res, next) => {
    const auth = req.headers.authorization

    if(!auth){
        return res.status(498).json({code: 498, message: "o Token de autenticação não existe!"})
    }

    const [, token] = auth.split(' ')

    try{
        // promisify converte uma função de callback para uma função async/await
        const decodificado = await promisify(jwt.verify)(token, process.env.SECRET);

        if(!decodificado){
            return res.status(498).json({error: true, code: 498, message: "O token está expirado!"})
        }else{
            req.user_id=decodificado.user_id
            next()
        }
    }catch(err){
        //console.log(err)
        return res.status(498).json({ error: true, code: 498, message: "O token está inválido!" })
    }
}
export default AuthMiddleware