import { Router } from "express";
import { AuthController } from "../controllers/Auth.controller";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { authenticate } from "../middleware/auth";


const router = Router()

router.use(limiter) //Esto limita el número de peticiones en todas las rutas

router.post('/create-account', 
    body('name')
        .notEmpty().withMessage('El nombre del usuatio no puede ir vacio'),
    body('password')
        .isLength({min: 8}).withMessage('El password es muy corto, mínimo de 8 caractreres'),
    body('email')
        .isEmail().withMessage('Email no válido'),
    handleInputErrors,
    AuthController.createAccount
)


router.post('/login',
    body('email')
        .isEmail().withMessage('Email no válido'),
    body('password')
        .notEmpty().withMessage('El password no debe estar vacio'),
    handleInputErrors,
    AuthController.login
)


router.get('/user',
    authenticate,
    handleInputErrors,
    AuthController.getUser
)

router.post('/update-password', 
    authenticate,
    body('current_password')
        .notEmpty().withMessage('El password actual es requerido'),
    body('new_password')
        .isLength({min: 8}).withMessage('La nueva contraseña debe ser minimo de 8 caracteres'),
    handleInputErrors,
    AuthController.updatePassword
)

router.post('/check-password', 
    authenticate,
    body('password')
        .notEmpty().withMessage('El password actual es requerido'),
    handleInputErrors,
    AuthController.checkPassword
)


export default router