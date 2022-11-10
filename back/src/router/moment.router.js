const Router = require('koa-router')

const { verifyLoginAuth } = require('../middleware/user.middleware')
const { create, getMomentDetailById, update, getLabels, list } = require('../controller/moment.controller')

const momentRouter = new Router({ prefix: '/moment' })

// 文章上传接口
momentRouter.post('/', verifyLoginAuth, create)
// 根据文章id修改文章接口
momentRouter.patch('/:momentId', verifyLoginAuth, update)
// 根据文章id获取文章详情
momentRouter.get('/:momentId', getMomentDetailById)
// 文章标签接口
momentRouter.get('/label/labelList', getLabels)
// 文章列表接口
momentRouter.get('/list/momentList', list)

module.exports = momentRouter
