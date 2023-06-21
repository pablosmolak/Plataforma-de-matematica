import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const AuthMiddleware = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      return res.status(498).json({error: true, code: 498, message: "O token de autenticação não existe!" })
    }

    const [, token] = auth.split(' '); // desestruturação

    const decodificado = await promisify(jwt.verify)(token, process.env.SECRET);
    if (decodificado) { 
      req.user_id = decodificado.id;
      next();
    } 

  } catch {
    return res.status(498).json({error: true, code: 498, message: "O token está inválido!"})
  }

}
export default AuthMiddleware;
