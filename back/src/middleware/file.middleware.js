const Multer = require('koa-multer')

const avatarUpload = Multer({
  dest: './uploads/avatar'
})

module.exports = {
  fileReceiverHandle: avatarUpload.single('avatar')
}