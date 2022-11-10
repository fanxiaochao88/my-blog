import request from './index'

enum MOMENT_API_URL {
  getMomentDetailById = '/moment/',
  getMomentList = '/moment/list/momentList'
}

class MomentAPI {
  getMomentDetailById(id: any) {
    return request.get({
      url: MOMENT_API_URL.getMomentDetailById + id,
    })
  }

  getMomentList() {
    return request.get({
      url: MOMENT_API_URL.getMomentList
    })
  }
}

export default new MomentAPI()