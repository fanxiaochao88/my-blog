
const svgCaptcha = require('svg-captcha');
const {obj} = require('../app/config')
class UserController {
  static staticProperty = 'someValue';
  /**
   * 注册
   * @param {*} ctx
   * @param {*} next
   */
  async create(ctx, next) {
    ctx.body = UserController.staticProperty
  }

  /**
   * 获取验证码图片
   * @param {*} ctx
   * @param {*} next
   */
  async createCaptcha(ctx, next) {
    var captcha = svgCaptcha.create()
    ctx.response.set('content-type', 'svg')
    ctx.body = captcha
  }

  /**
   * 发送邮箱验证码
   */
  async sendEmail(ctx, next) {
    // 邮箱已经验证
    const email = ctx.request.body.email
    const YAM_CODE = '3065'
    UserController.staticProperty = YAM_CODE
    obj.send(email, YAM_CODE)
    ctx.body = '请查看邮箱~'
  }
}

module.exports = new UserController()
