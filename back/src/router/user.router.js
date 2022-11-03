const Router = require('koa-router')
const userRouter = new Router({ prefix: '/user' })

const { create } = require('../controller/user.controller')
const { verifyBodyInfo, createCaptcha, sendEmail, sendShortMessage, verifyEmail, verifyPhoneNumber, handlePassword } = require('../middleware/user.middleware')

// 注册用户接口
userRouter.post('/register', verifyBodyInfo, verifyEmail, verifyPhoneNumber, handlePassword, create)
// 生成干扰图片验证码接口
userRouter.get('/captcha', createCaptcha)
// 发送邮箱验证码接口
userRouter.post('/sendEmail', verifyEmail, sendEmail)
// 发送短信验证码接口
userRouter.post('/sendShortMessage', verifyPhoneNumber, sendShortMessage)

module.exports = userRouter
