const Router = require('koa-router')
const userRouter = new Router({prefix: '/user'})

const { create, createCaptcha, sendEmail } = require('../controller/user.controller')
const {verifyBodyInfo, verifyEmail} = require('../middleware/user.middleware')
 
// 注册用户
userRouter.post('/register', verifyBodyInfo, create)
// 生成验证码
userRouter.get('/captcha', createCaptcha)
// 发送邮箱验证码接口
userRouter.post('/sendEmail', verifyEmail, sendEmail)

module.exports = userRouter