const fileService = require('../service/file.service')
const fs = require('fs')
class FileController {
  async saveAvatar(ctx, next) {
    // 先拿到头像信息
    const { mimetype, filename, size } = ctx.req.file
    // 插入数据库
    const result = await fileService.saveAvatar(mimetype, filename, size)
    ctx.body = {
      code: 200,
      msg: '文件上传成功',
      file: result
    }
  }

  async avatarInfo(ctx, next) {
    const { avatarId } = ctx.request.params
    const result = await fileService.getAvatarById(avatarId)
    console.log(result)
    ctx.response.set('content-type', result.mimetype)
    ctx.body = fs.createReadStream('./uploads/avatar/' + result.filename)
  }

  async savePicture(ctx, next) {
    const files = ctx.req.files
    const userId = ctx.user.id
    const momentId = ctx.request.params.momentId
    let result
    for (const file of files) {
      const { mimetype, filename, size } = file
      result = await fileService.savePicture(userId, momentId, mimetype, filename, size)
    }

    const res = await fileService.getPictureById(result.insertId)

    ctx.body = {
      code: 200,
      msg: '上传成功',
      url: 'http://localhost:8001/upload/picture/' + res.filename
    }
  }

  async pictureInfo(ctx, next) {
    let filename = ctx.params.filename
    const result = await fileService.getPictureByFilename(filename)
    ctx.response.set('content-type', result.mimetype)
    ctx.body = fs.createReadStream('./uploads/picture/' + filename)
  }

  async saveMainCover(ctx, next) {
    const { mimetype, filename, size } = ctx.req.file
    const { momentId } = ctx.request.params
    await fileService.saveMainCover(momentId, mimetype, filename, size)
    ctx.body = {
      code: 200,
      msg: '文件上传成功',
      mainCoverUrl: 'http://localhost:8001/upload/mainCover/' + filename
    }
  }

  async mainCoverInfo(ctx, next) {
    const { filename } = ctx.request.params
    const result = await fileService.getMainCoverByFilename(filename)
    ctx.response.set('content-type', result.mimetype)
    ctx.body = fs.createReadStream('./uploads/mainCover/' + filename)
  }
}

module.exports = new FileController()
