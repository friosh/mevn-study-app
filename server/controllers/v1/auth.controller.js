import User from '@models/User'

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
    const { email } = req.body
    const user = await User.findOne({ email })
    await user.restore()
    return res.json({
      message: 'Password reset link sent',
    })
  } catch (e) {
    console.log(e)
  }
}

export default {
  login,
  register,
  restore,
}
