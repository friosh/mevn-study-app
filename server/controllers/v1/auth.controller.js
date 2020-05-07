import User from '@models/User'
import Bcrypt from 'bcryptjs'
import PasswordReset from '../../models/PasswordReset';

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
  } catch (e) {
    console.log(e)
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
  } catch (e) {
    console.log(e)
  }
}

const restore = async (req, res) => {
  try {
    await req.user.restorePassword()
    return res.json({
      message: 'Password reset link sent',
    })
  } catch (e) {
    return res.status(400).json({
      message: 'Some error',
    })
  }
}

const reset = async (req, res) => {
  try {
    const { user } = req
    await User.findOneAndUpdate(
        { email: user.email},
        {password: Bcrypt.hashSync(req.body.password)}
        )
    await PasswordReset.findOneAndDelete(
        {email: user.email }
    )
    return res.json({
      message: 'Password reset successfully',
    })
  } catch (e) {
    return res.status(400).json({
      message: 'Some error',
    })
  }
}

export default {
  login,
  register,
  reset,
  restore,
}
