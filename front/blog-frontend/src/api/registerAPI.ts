import request from './index'

enum RegisterAPI_URL {
  getEmailCode = '/user/sendEmail',
  getPhoneCode = '/user/sendShortMessage',
  register = '/user/register',
  verifyUsername = '/user/verifyUsername'
}

class RegisterAPI {
  /**
   * 获取邮箱验证码接口
   * @param data
   * @returns
   */
  getEmailCode(data: any) {
    return request.post({
      url: RegisterAPI_URL.getEmailCode,
      data
    })
  }
  getPhoneCode(data: any) {
    return request.post({
      url: RegisterAPI_URL.getPhoneCode,
      data
    })
  }
  register(data: any) {
    return request.post({
      url: RegisterAPI_URL.register,
      data
    })
  }
  verifyUsername(data: any) {
    return request.post({
      url: RegisterAPI_URL.verifyUsername,
      data
    })
  }
}

export default new RegisterAPI()
