// 统一出口
import { BASE_URL, TIME_OUT } from './request/config'
import QR_Request from './request'
// 第一个request对象
const qrRequest = new QR_Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
export default qrRequest
