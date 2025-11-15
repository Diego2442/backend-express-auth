import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: !process.env.DEBUG ? 5 : 100,
    message: 'Has alcanzado el límite de peticiones'
})

//Este limiter se puede aplicar a todas las rutas, o a un conjunto de rutas o a una ruta en particular video 188 del curso, única regla es que se debe aplicar antes del Resquest o Response