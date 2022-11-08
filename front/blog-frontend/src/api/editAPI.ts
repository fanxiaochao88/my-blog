import request from './index'

enum Edit_API_URL {
  publishMoment = '/moment',
  updateMomentById = '/moment/',
  uploadImage = '/upload/picture/'
}

class EditAPI {
  publishMoment(data: any) {
    return request.post({
      url: Edit_API_URL.publishMoment,
      data
    })
  }

  updateMomentById(id: any, data: any) {
    return request.patch({
      url: Edit_API_URL.updateMomentById + id,
      data
    })
  }

  uploadImage(id: any, file: any) {
    const data = new FormData()
    data.append('picture', file)
    return request.post({
      url: Edit_API_URL.uploadImage + id,
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default new EditAPI()
