import { NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

declare global {
    namespace Express {
        interface Request {
            user?: User | null 
        }
    }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization

        if(!bearer) {
            const error = new Error('No estas autorizado')
            res.status(401).json({error: error.message})
            return
        } 

        const [, token] = bearer.split(' ')

        if (!token){
            const error = new Error('Token no válido')
            res.status(401).json({error: error.message})
            return
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET!)
            //Se coloca esta comprobación debido a que typescript no sabe cual es el valor que retorna ese jwt.verify entonces no puede inferirlo
            if(typeof decode === 'object' && decode.id){
                req.user = await User.findByPk(decode.id, {
                    attributes: ['id', 'name', 'email']
                })
                next()
            }
        } catch (error) {
            res.status(500).json({error: 'Token no válido'})
        }


} 