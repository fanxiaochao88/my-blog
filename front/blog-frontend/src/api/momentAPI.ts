import request from './index'

enum MOMENT_API_URL {
  getMomentDetailById = '/moment/'
}

class MomentAPI {
  getMomentDetailById(id: any) {
    return request.get({
      url: MOMENT_API_URL.getMomentDetailById + id,
    })
  }
}

export default new MomentAPI()