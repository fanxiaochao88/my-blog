const Router = require('koa-router')
const { fileReceiverHandle, filesReceiverHandle } = require('../middleware/file.middleware')
const { saveAvatar, avatarInfo, savePicture, pictureInfo } = require('../controller/file.controller') 
const { verifyLoginAuth } = require('../middleware/user.middleware')

const fileRouter = new Router({prefix: '/upload'})

// 头像上传接口
fileRouter.post('/avatar', fileReceiverHandle, saveAvatar)
// 获取头像接口
fileRouter.get('/avatar/:avatarId', avatarInfo)

// 文章配图上传接口
fileRouter.post('/picture/:momentId', verifyLoginAuth, filesReceiverHandle, savePicture)
// 获取文章配图接口
fileRouter.get('/picture/:filename', pictureInfo)

module.exports = fileRouter