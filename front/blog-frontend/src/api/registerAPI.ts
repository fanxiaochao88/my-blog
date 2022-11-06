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
  /**
   * 获取手机验证码
   * @param data 
   * @returns 
   */
  getPhoneCode(data: any) {
    return request.post({
      url: RegisterAPI_URL.getPhoneCode,
      data
    })
  }
  /**
   * 注册
   * @param data 
   * @returns 
   */
  register(data: any) {
    return request.post({
      url: RegisterAPI_URL.register,
      data
    })
  }
  /**
   * 校验用户名是否唯一
   * @param data 
   * @returns 
   */
  verifyUsername(data: any) {
    return request.post({
      url: RegisterAPI_URL.verifyUsername,
      data
    })
  }
}

export default new RegisterAPI()
