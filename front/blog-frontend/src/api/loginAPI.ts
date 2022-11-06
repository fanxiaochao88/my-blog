import request from './index'

enum LOGIN_API_URL {
  getCaptcha = '/user/captcha',
  login = '/user/login'
}

class LoginAPI {
  getCaptcha() {
    return request.get({
      url: LOGIN_API_URL.getCaptcha
    })
  }
  login(data: any) {
    return request.post({
      url: LOGIN_API_URL.login,
      data
    })
  }
}

export default new LoginAPI()
