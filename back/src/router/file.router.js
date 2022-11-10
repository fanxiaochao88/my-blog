const Router = require('koa-router')
const { fileReceiverHandle, filesReceiverHandle, fileReceiverHandleCover } = require('../middleware/file.middleware')
const { saveAvatar, avatarInfo, savePicture, pictureInfo, saveMainCover, mainCoverInfo } = require('../controller/file.controller') 
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

// 文章封面图片上传
fileRouter.post('/mainCover/:momentId', verifyLoginAuth, fileReceiverHandleCover, saveMainCover)
// 获取文章封面接口
fileRouter.get('/mainCover/:filename', mainCoverInfo)

module.exports = fileRouter