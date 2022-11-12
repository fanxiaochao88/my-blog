const Router = require('koa-router')

const { verifyLoginAuth } = require('../middleware/user.middleware')
const { create, list } = require('../controller/link.controller')

const linkMomentRouter = new Router({ prefix: '/linkMoment' })

// 新增网文接口
linkMomentRouter.post('/', verifyLoginAuth, create)
// 网文列表接口
linkMomentRouter.get('/', list)

module.exports = linkMomentRouter
