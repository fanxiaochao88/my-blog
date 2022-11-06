const Router = require('koa-router')
const userRouter = new Router({ prefix: '/user' })

const { create, login } = require('../controller/user.controller')
const { verifyLoginAuth,verifyBodyInfo,verifyLoginData, createCaptcha, sendEmail, sendShortMessage, verifyEmail, verifyPhoneNumber, handlePassword, verifyUsername } = require('../middleware/user.middleware')

// 注册用户接口
userRouter.post('/register', verifyBodyInfo, verifyEmail, verifyPhoneNumber, handlePassword, create)
// 验证用户名是否已存在
userRouter.post('/verifyUsername', verifyUsername)
// 生成干扰图片验证码接口
userRouter.get('/captcha', createCaptcha)
// 发送邮箱验证码接口
userRouter.post('/sendEmail', sendEmail)
// 发送短信验证码接口
userRouter.post('/sendShortMessage', sendShortMessage)
// 用户登录接口
userRouter.post('/login', verifyLoginData, login)
// 验证token权限
userRouter.get('/test', verifyLoginAuth)

module.exports = userRouter
