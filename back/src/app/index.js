const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const useRoutes = require('../router/index')
const { errorHandle } = require('./error-handle')

const app = new Koa()

app.use(cors({
  origin: function() {
    return '*'
  }
}))
app.use(bodyParser())
useRoutes(app)

// 错误统一处理
app.on('error', errorHandle)



module.exports = app