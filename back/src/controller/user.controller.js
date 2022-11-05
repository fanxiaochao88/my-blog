const userService = require('../service/user.service')
class UserController {
  /**
   * 注册
   * @param {*} ctx
   * @param {*} next
   */
  async create(ctx, next) {
    // 插入操作
  console.log(555);
    const { username, password, email, phoneNumber, nickname, sex, company, baseAddress, bolgAddress, githubAddress, avatarCode } = ctx.request.body
    const result = await userService.create(username, password, email, phoneNumber, nickname, sex, company, baseAddress, bolgAddress, githubAddress, avatarCode)
    console.log(666);
    ctx.body = {
      code: 200,
      msg: '注册成功~'
    }
  }
}

module.exports = new UserController()
