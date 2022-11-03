const dotenv = require('dotenv')
const Core = require('@alicloud/pop-core')
// 发送邮箱配置
const nodemailer = require('nodemailer')
const obj = {
  transporter: nodemailer.createTransport({
    host: 'smtp.qq.com', // 默认是这个
    port: 465,
    auth: {
      user: '3065717078@qq.com',
      pass: 'lxvuwshhnjjddeig'
    }
  }),

  send: function (mail, content) {
    const mailOptions = {
      // 发送方的邮箱地址
      from: '3065717078@qq.com',
      to: mail, // 对方邮箱
      // cc         : ''  //抄送 用于多人邮件
      // bcc      : ''    //密送
      subject: '激活验证码',
      text: `您的注册验证码为：${content}, 24小时内有效，请谨慎保管`,
      html: `
            <head>
            <base target="_blank" />
            <style type="text/css">::-webkit-scrollbar{ display: none; }</style>
            <style id="cloudAttachStyle" type="text/css">#divNeteaseBigAttach, #divNeteaseBigAttach_bak{display:none;}</style>
            <style id="blockquoteStyle" type="text/css">blockquote{display:none;}</style>
            <style type="text/css">
                body{font-size:14px;font-family:arial,verdana,sans-serif;line-height:1.666;padding:0;margin:0;overflow:auto;white-space:normal;word-wrap:break-word;min-height:100px}
                td, input, button, select, body{font-family:Helvetica, 'Microsoft Yahei', verdana}
                pre {white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:95%}
                th,td{font-family:arial,verdana,sans-serif;line-height:1.666}
                img{ border:0}
                header,footer,section,aside,article,nav,hgroup,figure,figcaption{display:block}
                blockquote{margin-right:0px}
                </style>
            </head>
            <body tabindex="0" role="listitem">
            <table width="700" border="0" align="center" cellspacing="0" style="width:700px;">
                <tbody>
                <tr>
                    <td>
                        <div style="width:700px;margin:0 auto;border-bottom:1px solid #ccc;margin-bottom:30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="700" height="39" style="font:12px Tahoma, Arial, 宋体;">
                                <tbody><tr><td width="210"></td></tr></tbody>
                            </table>
                        </div>
                        <div style="width:680px;padding:0 10px;margin:0 auto;">
                            <div style="line-height:1.5;font-size:14px;margin-bottom:25px;color:#4d4d4d;">
                                <strong style="display:block;margin-bottom:15px;">尊敬的用户：<span style="color:#f60;font-size: 16px;"></span>您好！</strong>
                                <strong style="display:block;margin-bottom:15px;">
                                    您正在进行<span style="color: red">宝酱账号申请</span>操作，请在验证码输入框中输入：<span style="color:#f60;font-size: 24px">${content}</span>，以完成操作。
                                </strong>
                            </div>
                            <div style="margin-bottom:30px;">
                                <small style="display:block;margin-bottom:20px;font-size:12px;">
                                    <p style="color:#747474;">
                                        注意：此操作可能会修改您的密码、登录邮箱或绑定手机。如非本人操作，请及时登录并修改密码以保证帐户安全
                                        <br>（工作人员不会向你索取此验证码，请勿泄漏！)
                                    </p>
                                </small>
                            </div>
                        </div>
                        <div style="width:700px;margin:0 auto;">
                            <div style="padding:10px 10px 0;border-top:1px solid #ccc;color:#747474;margin-bottom:20px;line-height:1.3em;font-size:12px;">
                                <p>此为系统邮件，请勿回复<br>
                                    请保管好您的邮箱，避免账号被他人盗用
                                </p>
                                <p>宝酱管理员</p>
                            </div>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
            </body>
        `
    }
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info)
    })
  }
}
// 发送短信验证码
const client = new Core({
  accessKeyId: 'LTAI5tMXJQcv37uL1XFNHTDT',
  accessKeySecret: 'QA7IDGdMGz1uhV5bMhRHh9NkT9Ndhm',
  // securityToken: '<your-sts-token>', // use STS Token
  endpoint: 'https://dysmsapi.aliyuncs.com',
  apiVersion: '2017-05-25'
})
/**
 * dotenv启动路径必须在根目录
 * 否则读取不到.env变量的值
 */
dotenv.config()
const { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env

module.exports = { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, obj, client }
