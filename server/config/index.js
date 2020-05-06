import dotenv from 'dotenv'
dotenv.config()

export default {
  databaseUri:
    process.env.DATABASE_URL || 'mongodb://localhost:27017/mevnmongo',
  url: process.env.APP_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'dawd8987a9d6wdwa69daw9d6aw9d',
}
