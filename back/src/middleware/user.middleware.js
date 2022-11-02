
/**
 * 校验用户注册的信息
 * @param {*} ctx
 * @param {*} next
 */
const verifyBodyInfo = async (ctx, next) => {
  const body = ctx.request.body
  await next()
}

/**
 * 校验邮箱发送验证码
 * @param {*} ctx 
 * @param {*} next 
 */
const verifyEmail = async (ctx, next) => {
  await next()
}

module.exports = {
  verifyBodyInfo,
  verifyEmail
}
