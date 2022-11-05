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
    const {avatarId} = ctx.request.params
    const result = await fileService.getAvatarById(avatarId)
    console.log(result);
    ctx.response.set('content-type', result.mimetype)
    ctx.body = fs.createReadStream('./uploads/avatar/' + result.filename)
  }
}

module.exports = new FileController()