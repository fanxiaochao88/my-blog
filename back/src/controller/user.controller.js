const userService = require('../service/user.service')
const jwt = require('jsonwebtoken')
const config = require('../app/config')
class UserController {
  /**
   * 注册
   * @param {*} ctx
   * @param {*} next
   */
  async create(ctx, next) {
    // 插入操作
    console.log(555)
    const { username, password, email, phoneNumber, nickname, sex, company, baseAddress, bolgAddress, githubAddress, avatarCode } = ctx.request.body
    const result = await userService.create(username, password, email, phoneNumber, nickname, sex, company, baseAddress, bolgAddress, githubAddress, avatarCode)
    console.log(666)
    ctx.body = {
      code: 200,
      msg: '注册成功~'
    }
  }

  /**
   * 登录
   * @param {*} ctx 
   * @param {*} next 
   */
  async login(ctx, next) {
    const { id, username } = ctx.user
    const token = jwt.sign({id, username}, config.PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 一天
      algorithm: 'RS256'
    })
    ctx.body = {
      code: 200,
      userInfo: ctx.user,
      token,
      msg: '登录成功'
    }
  }
}

module.exports = new UserController()
