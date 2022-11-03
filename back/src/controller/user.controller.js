
class UserController {
  /**
   * 注册
   * @param {*} ctx
   * @param {*} next
   */
  async create(ctx, next) {
    ctx.body = ctx.request.body
  }
}

module.exports = new UserController()
