import { NextFunction, Request, Response } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { checkPassword, hashPassword } from '../utilities/auth'
import { generateJWT } from '../utilities/jwt'

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {

        const { email, password } = req.body
        const user_exists = await User.findOne({ where: { email } }) //Se coloca el objeto simple, porque la columna de la bd y la constante se llaman de la misma forma

        if (user_exists) {
            const error = new Error('El email ya esta registrado')
            res.status(409).json({ error: error.message })
            return
        }

        try {
            const user = await User.create(req.body)
            user.password = await hashPassword(password)
            await user.save()

            res.status(201).json('Usuario creado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }


    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        //Revisar que el usuario exista
        const user = await User.findOne({ where: { email } })
        if (!user) {
            const error = new Error('Usuario no encontrado con este email')
            res.status(404).json({ error: error.message })
            return
        }

        const isPasswordCorrect = await checkPassword(password, user.password)
        if (!isPasswordCorrect) {
            const error = new Error('Datos de usuario incorrectos')
            res.status(401).json({ error: error.message })
            return
        }

        //Si el usuario esta autenticado se envia el token
        const token = generateJWT(user.id)
        res.json(token)
    }


    static getUser = async (req: Request, res: Response) => {
        const token = generateJWT(req.user?.id)
        res.json({user: req.user, token})

    }

    static updatePassword = async (req: Request, res: Response) => {
        const { current_password, new_password } = req.body

        const user = await User.findByPk(req.user!.id)

        const isPasswordCorrect = await checkPassword(current_password, user!.password)

        if (!isPasswordCorrect) {
            const error = new Error('La contraseña actual es incorrecta, verifica')
            res.status(401).json({ error: error.message })
            return
        }

        user!.password = await hashPassword(new_password)
        await user!.save()

        res.json('Contraseña Actualizada con éxito')
    }

    static checkPassword = async (req: Request, res: Response) => {
        const { password } = req.body

        const user = await User.findByPk(req.user!.id)

        const isPasswordCorrect = await checkPassword(password, user!.password)

        if (!isPasswordCorrect) {
            const error = new Error('La contraseña actual es incorrecta, verifica')
            res.status(401).json({ error: error.message })
            return
        }

        res.json('Contraseña Correcta')
    }


}