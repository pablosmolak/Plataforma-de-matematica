import  jwt from "jsonwebtoken"

const AuthMiddleware = async (req, res, next) => {
    try{
        const auth = req.headers.authorization

        if(!auth){
            return res.status(498).json({code: 498, message: "O Token de autenticação não existe!"})
        }

        const [, token] = auth.split(' ')

        jwt.verify(token,process.env.SECRET, (error, decodificado) => {
            if(error){
                return res.status(498).json({error: true, code: 498, message: "O token está expirado!"})
            }
            req.user_id=decodificado.id
            next()
        })
    

    }catch(err){
        console.log(err)
        return res.status(498).json({ error: true, code: 498, message: "O token está inválido!" })
    }
}
export default AuthMiddleware