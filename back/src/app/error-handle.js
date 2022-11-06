const errorTypes = require('../constants/error-types')

const errorHandle = (error, ctx) => {
  let status
  switch (error.message) {
    case errorTypes.USER_PARAMS_IS_NOT_EMPTY:
      status = 400
      break
    case errorTypes.USER_EMAIL_CODE_IS_NOT_MATCH:
      status = 400
      break
    case errorTypes.USER_PHONE_NUMBER_CODE_IS_NOT_MATCH:
      status = 400
      break
    case errorTypes.USER_USERNAME_IS_NOT_EXISTS:
      status = 400
      break
    case errorTypes.USER_CAP_IS_NOT_MATCH:
      status = 400
      break
    case errorTypes.PASSWORD_IS_NOT_RIGHT:
      status = 400
      break
    case errorTypes.TOKEN_IS_INVALID:
      status = 400
      break
    default:
      status = 400
      error.message = '暂未处理的错误'
  }

  ctx.status = status
  ctx.body = {
    code: status,
    msg: error.message
  }
}

module.exports = {
  errorHandle
}
