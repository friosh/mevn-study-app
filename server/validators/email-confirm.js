import * as Yup from 'yup'
import User from '@models/User'

const ConfirmEmailSchema = Yup.object().shape({
  token: Yup.string().required(),
})

export default async (req, res, next) => {
  try {
    const token = req.body
    ConfirmEmailSchema.validate(req.body)
    const user = User.findOne({ emailConfirmCode: token })
    if (!user) {
      throw new Yup.ValidationError('This token is invalid', req.body, 'token')
    }
    req.user = user
    return next()
  } catch (error) {
    return res.status(422).json({
      [error.path]: error.message,
    })
  }
}
