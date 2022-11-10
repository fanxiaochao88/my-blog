const Multer = require('koa-multer')

const avatarUpload = Multer({
  dest: './uploads/avatar'
})

const pictureUpload = Multer({
  dest: './uploads/picture'
})

const mainCoverUpload = Multer({
  dest: './uploads/mainCover'
})

module.exports = {
  fileReceiverHandle: avatarUpload.single('avatar'),
  filesReceiverHandle: pictureUpload.array('picture', 9),
  fileReceiverHandleCover: mainCoverUpload.single('mainCover')
}