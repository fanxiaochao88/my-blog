const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRoutes = require('../router/index')

const app = new Koa()

app.use(bodyParser())
useRoutes(app)

module.exports = app