import config from './config'
import BodyParser from 'body-parser'
import Express from 'express'
import Mongoose from 'mongoose'
import path from 'path'
import v1Router from './routes';
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import Webpack from 'webpack'
import WebpackConfig from '../webpack.config'


async function start() {
  try {
    await Mongoose.connect(config.databaseUri, { useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(3000, () => {
      console.log('server hi started');
    })
  } catch (e) {
    console.log(e);
  }
}
const app = Express()
const compiler = Webpack(WebpackConfig)

app.use(BodyParser.json())
app.use(WebpackDevMiddleware(compiler, {
  hot: true,
  publicPath: WebpackConfig.output.publicPath
}))
app.use(WebpackHotMiddleware(compiler))
app.use(v1Router)

// app.use(Express.static(path.resolve(__dirname, 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})


start()
