import { Router } from 'express'
import authController from '@controllers/v1/auth.controller'
import loginValidator from '@validators/login'
import registerValidator from '@validators/register'
import restoreValidator from '../../validators/restore'
import resetPasswordValidator from '@validators/reset-password'
import emailConfirmValidator from '@validators/email-confirm'
import resendConfirmMiddleware from '@middleware/auth'

const authRouter = new Router()
authRouter.post('/login', loginValidator, authController.login)
authRouter.post('/register', registerValidator, authController.register)
authRouter.post('/restore', restoreValidator, authController.restore)
authRouter.post('/reset', resetPasswordValidator, authController.reset)
authRouter.post(
  '/confirm-email',
  emailConfirmValidator,
  authController.confirmEmail
)
authRouter.post(
  '/resend-confirm-email',
  resendConfirmMiddleware,
  authController.resendConfirmEmail
)

export default authRouter
