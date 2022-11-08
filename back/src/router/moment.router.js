const Router = require('koa-router')

const { verifyLoginAuth } = require('../middleware/user.middleware')
const { create, getMomentDetailById, update } = require('../controller/moment.controller')

const momentRouter = new Router({ prefix: '/moment' })

// 文章上传接口
momentRouter.post('/', verifyLoginAuth, create)
// 根据文章id修改文章接口
momentRouter.patch('/:momentId', verifyLoginAuth, update)
// 根据文章id获取文章详情
momentRouter.get('/:momentId', getMomentDetailById)

module.exports = momentRouter
