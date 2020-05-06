import mongoose from 'mongoose'
import Bcrypt from 'bcryptjs'
import randomstring from 'randomstring'
import jwt from 'jsonwebtoken'
import Mail from '@fullstackjs/mail'
import config from '@config'

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  createdAt: Date,
  updateAt: Date,
  password: String,
  emailConfirmedAr: Date,
  emailConfirmedCode: String,
})

UserSchema.pre('save', function () {
  ;(this.password = Bcrypt.hashSync(this.password)),
    (this.emailConfirmedCode = randomstring.generate(72))
  this.createdAt = new Date()
})

UserSchema.post('save', async function () {
  return await new Mail('confirm-account')
    .to(this.email, this.name)
    .subject('Please confirm your email')
    .data({
      name: this.name,
      url: `${config.url}/auth/emails/confirm/${this.emailConfirmedCode}`,
    })
    .send()
})

UserSchema.methods.comparePassword = function (plainPass) {
  return Bcrypt.compareSync(plainPass, this.password)
}

UserSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, config.jwtSecret)
}

export default mongoose.model('User', UserSchema)
