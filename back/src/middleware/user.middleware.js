const svgCaptcha = require('svg-captcha')
const { obj, client } = require('../app/config')
const { md5Password } = require('../utils/password-handle')
const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')

const jwt = require('jsonwebtoken')
const config = require('../app/config')

let EMAIL_CODE = 'abcd'
let PHONE_NUMBER_CODE = '1234'
let CAP_TEXT = '111111'
/**
 * 校验用户注册的信息
 * @param {*} ctx
 * @param {*} next
 */
const verifyBodyInfo = async (ctx, next) => {
  console.log(111)
  const body = ctx.request.body
  // 判空
  if (!body.username || !body.password || !body.email || !body.emailCode || !body.phoneNumber || !body.phoneNumberCode) {
    const error = new Error(errorTypes.USER_PARAMS_IS_NOT_EMPTY)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

/**
 * 校验用户名是否存在
 * @param {*} ctx
 * @param {*} next
 */
const verifyUsername = async (ctx, next) => {
  const { username } = ctx.request.body
  // 调接口验证
  const result = await userService.verifyUsername(username)
  if (result.length) {
    ctx.body = {
      code: 200,
      msg: 1,
      result: result[0]
    }
  } else {
    ctx.body = {
      code: 200,
      msg: 0,
      result: {}
    }
  }
}

/**
 * 获取验证码图片
 * @param {*} ctx
 * @param {*} next
 */
const createCaptcha = async (ctx, next) => {
  const random = Math.random() * 10
  let captcha = ''
  if (random > 5) {
    captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 排除某些字符
      noise: 4, // 干扰线数量
      color: true, // 验证码字符是否有颜色, 默认没有, 如果设定了背景, 则默认有
      background: '#cc9966' // 验证码图片背景颜色
    })
  } else {
    captcha = svgCaptcha.createMathExpr({
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 排除某些字符
      noise: 4, // 干扰线数量
      color: true, // 验证码字符是否有颜色, 默认没有, 如果设定了背景, 则默认有
      background: '#cc9966' // 验证码图片背景颜色
    })
  }
  ctx.response.set('content-type', 'svg')
  CAP_TEXT = captcha.text
  ctx.body = captcha.data
}

/**
 * 发送邮箱验证码
 */
const sendEmail = async (ctx, next) => {
  // 邮箱已经验证
  const email = ctx.request.body.email
  // 判断邮箱是否存在
  const result = await userService.isHasEmail(email)
  if (!result.length) {
    const emailCode = Math.floor(Math.random() * 9999)
    EMAIL_CODE = emailCode
    obj.send(email, emailCode)
    ctx.body = {
      code: 200,
      msg: '请关注邮箱动态~',
      result: {}
    }
  } else {
    ctx.body = {
      code: 200,
      msg: '邮箱已存在',
      result: result[0]
    }
  }
}

/**
 * 发送短信验证码
 * @param {*} ctx
 * @param {*} next
 */
const sendShortMessage = async (ctx, next) => {
  const code = Math.floor(Math.random() * 9999)
  const phoneNumber = ctx.request.body.phoneNumber
  // 检查phoneNumber是否存在
  const result = await userService.isHasPhone(phoneNumber)
  if (result.length) {
    ctx.body = {
      code: 200,
      msg: '手机号码已注册',
      result: result[0]
    }
  } else {
    try {
      console.log('fffffff')
      await client.request(
        'SendSms',
        {
          SignName: '阿里云短信测试',
          TemplateCode: 'SMS_154950909',
          PhoneNumbers: phoneNumber,
          TemplateParam: `{'code': ${code}}`
        },
        {
          method: 'POST',
          formatParams: false
        }
      )
    } catch (error) {
      console.log(err)
      ctx.body = {
        code: 400,
        msg: '手机短信失败~',
        err
      }
    }
    PHONE_NUMBER_CODE = code
    ctx.body = {
      code: 200,
      msg: '请留意手机短信~',
      result: {}
    }
  }
}

/**
 * 校验邮箱发送验证码
 * @param {*} ctx
 * @param {*} next
 */
const verifyEmail = async (ctx, next) => {
  console.log(222)
  if (ctx.request.body.emailCode != EMAIL_CODE) {
    const error = new Error(errorTypes.USER_EMAIL_CODE_IS_NOT_MATCH)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

/**
 * 校验手机号发送短信验证码
 * @param {*} ctx
 * @param {*} next
 */
const verifyPhoneNumber = async (ctx, next) => {
  console.log(333)
  if (ctx.request.body.phoneNumberCode != PHONE_NUMBER_CODE) {
    const error = new Error(errorTypes.USER_PHONE_NUMBER_CODE_IS_NOT_MATCH)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}
/**
 * 密码加密
 * @param {*} ctx
 * @param {*} next
 */
const handlePassword = async (ctx, next) => {
  console.log(444)
  ctx.request.body.password = md5Password(ctx.request.body.password)
  await next()
}

/**
 * 登录参数的校验
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const verifyLoginData = async (ctx, next) => {
  const { username, password, capText } = ctx.request.body
  // 校验验证码
  if (capText != CAP_TEXT) {
    const error = new Error(errorTypes.USER_CAP_IS_NOT_MATCH)
    return ctx.app.emit('error', error, ctx)
  }
  // 校验是否为空
  if (!username || !password || !capText) {
    const error = new Error(errorTypes.USER_PARAMS_IS_NOT_EMPTY)
    return ctx.app.emit('error', error, ctx)
  }
  // 校验用户名是否存在
  const result = await userService.verifyUsername(username)
  if (!result.length) {
    const error = new Error(errorTypes.USER_USERNAME_IS_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  // 校验密码是否匹配
  if (md5Password(password) != result[0].password) {
    const error = new Error(errorTypes.PASSWORD_IS_NOT_RIGHT)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = result[0]
  await next()
}

/**
 * token验证中间件
 * @param {*} ctx 
 * @param {*} next 
 * @returns 
 */
const verifyLoginAuth = async (ctx, next) => {
  console.log('loginauth');
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.TOKEN_IS_INVALID)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  try {
    const result = jwt.verify(token, config.PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
    await next()
  } catch (e) {
    // 验证不通过
    const error = new Error(errorTypes.TOKEN_IS_INVALID)
    return ctx.app.emit('error', error, ctx)
  }
}

module.exports = {
  verifyBodyInfo,
  createCaptcha,
  sendEmail,
  sendShortMessage,
  verifyEmail,
  verifyPhoneNumber,
  handlePassword,
  verifyUsername,
  verifyLoginData,
  verifyLoginAuth
}
