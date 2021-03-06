import mongoose from 'mongoose'
import Bcrypt from 'bcryptjs'
import randomstring from 'randomstring'
import jwt from 'jsonwebtoken'
import Mail from '@fullstackjs/mail'
import config from '@config'
import passwordReset from '@models/PasswordReset'
import PasswordReset from './PasswordReset'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: Date,
  updateAt: Date,
  password: String,
  emailConfirmedAt: Date,
  emailConfirmCode: String,
})

UserSchema.pre('save', function () {
  ;(this.password = Bcrypt.hashSync(this.password)),
    (this.emailConfirmCode = randomstring.generate(72))
  this.createdAt = new Date()
})

UserSchema.post('save', function () {
  return this.sendEmailConfirmation()
})

UserSchema.methods.comparePassword = function (plainPass) {
  return Bcrypt.compareSync(plainPass, this.password)
}

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, config.jwtSecret)
}

UserSchema.methods.restorePassword = async function () {
  const token = randomstring.generate(72)
  await PasswordReset.create({
    token,
    email: this.email,
    createdAt: new Date(),
  })

  await new Mail('forgot-password')
    .to(this.email, this.name)
    .subject('Password reset')
    .data({
      url: `${config.url}/auth/reset/${token}`,
      name: this.name,
    })
    .send()
}

UserSchema.methods.sendEmailConfirmation = function () {
  return new Mail('confirm-account')
    .to(this.email, this.name)
    .subject('Please confirm your email')
    .data({
      name: this.name,
      url: `${config.url}/auth/confirm/${this.emailConfirmCode}`,
    })
    .send()
}

export default mongoose.model('User', UserSchema)
