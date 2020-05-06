import Express from 'express'
import authRouter from './v1/auth';


const v1Router = new Express.Router()

v1Router.use('/api/v1/auth', authRouter)


export default v1Router
