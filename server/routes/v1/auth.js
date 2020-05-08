import { Router } from 'express'
import authController from '@controllers/v1/auth.controller'
import loginValidator from '@validators/login'
import registerValidator from '@validators/register'
import restoreValidator from '../../validators/restore'
import resetPasswordValidator from '@validators/reset-password'

const authRouter = new Router()
authRouter.post('/login', loginValidator, authController.login)
authRouter.post('/register', registerValidator, authController.register)
authRouter.post('/restore', restoreValidator, authController.restore)
authRouter.post('/reset', resetPasswordValidator, authController.reset)


export default authRouter
