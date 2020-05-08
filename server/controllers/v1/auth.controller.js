import User from '@models/User'
import Bcrypt from 'bcryptjs'
import PasswordReset from '../../models/PasswordReset'

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      if (user.comparePassword(password)) {
        const token = user.generateToken()
        return res.json({
          user,
          token,
        })
      }
    }
    return res.status(400).json({
      email: "This credentials don't match our records",
    })
  } catch (error) {
    return res.status(400).json({
      common: error.message,
    })
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({
      name,
      email,
      password,
    })

    const token = user.generateToken()

    return res.status(201).json({ user, token })
  } catch (error) {
    return res.status(422).json({
      common: error.message,
    })
  }
}

const restore = async (req, res) => {
  try {
    await req.user.restorePassword()
    return res.json({
      message: 'Password reset link sent',
    })
  } catch (error) {
    return res.status(422).json({
      common: error.message,
    })
  }
}

const reset = async (req, res) => {
  try {
    const { user } = req
    await User.findOneAndUpdate(
      { email: user.email },
      { password: Bcrypt.hashSync(req.body.password) }
    )
    await PasswordReset.findOneAndDelete({ email: user.email })
    return res.json({
      message: 'Password reset successfully',
    })
  } catch (error) {
    return res.status(422).json({
      common: error.message,
    })
  }
}

const confirmEmail = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        emailConfirmCode: null,
        emailConfirmedAt: new Date(),
      },
      { new: true }
    )
    const token = user.generateToken()
    return res.json({
      user,
      token,
      message: 'Email has confirmed',
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      common: error.message,
    })
  }
}

const resendConfirmEmail = async (req, res) => {
  try {
    if (!req.user.emailConfirmedAt) {
      await req.user.sendEmailConfirmation()
    }

    return res.json({
      message: 'Email confirm sent',
    })
  } catch (error) {
    console.log(error)
    return res.status(422).json({
      common: error.message,
    })
  }
}

export default {
  confirmEmail,
  login,
  register,
  resendConfirmEmail,
  reset,
  restore,
}
