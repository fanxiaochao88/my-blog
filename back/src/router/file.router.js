const Router = require('koa-router')
const { fileReceiverHandle } = require('../middleware/file.middleware')
const { saveAvatar, avatarInfo } = require('../controller/file.controller') 

const fileRouter = new Router({prefix: '/upload'})

// 头像上传接口
fileRouter.post('/avatar', fileReceiverHandle, saveAvatar)
// 获取头像接口
fileRouter.get('/avatar/:avatarId', avatarInfo)

module.exports = fileRouter