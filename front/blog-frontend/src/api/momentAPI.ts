import request from './index'

enum MOMENT_API_URL {
  getMomentDetailById = '/moment/',
  getMomentList = '/moment/list/momentList',
  getLinkMomentList = '/linkMoment'
}

class MomentAPI {
  getMomentDetailById(query: any) {
    return request.get({
      url: MOMENT_API_URL.getMomentDetailById,
      params: {
        viewCount: query.viewCount,
        momentId: query.momentId
      }
    })
  }

  getMomentList(keyword: string) {
    return request.get({
      url: MOMENT_API_URL.getMomentList,
      params: {
        keyword
      }
    })
  }

  getLinkMomentList(keyword: string) {
    return request.get({
      url: MOMENT_API_URL.getLinkMomentList,
      params: {
        keyword
      }
    })
  }
}

export default new MomentAPI()
