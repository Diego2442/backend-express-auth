import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import cors from 'cors'
import { db } from './config/db'
import AuthRouter from './routes/auth.router'
import { corsConfig } from './config/cors'

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Conexión a postgresql establecida'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Conexión fallida a postgresql establecida'))
    }
}
connectDB()

const app = express()

// Desactivar la cabecera X-Powered-By
app.disable('x-powered-by');

app.use(morgan('dev'))

app.use(express.json())

app.use(cors(corsConfig))

app.use('/api/users', AuthRouter)
app.use('/api/pokemon', () => {console.log('pokemon routes')});

app.use('/', (req, res) => {
    res.send('Todo bien...')
})


export default app