const linkService = require('../service/link.service')
class LinkController {
  async create(ctx, next) {
    const { id: userId } = ctx.user
    const { title,belongPlatform, description, labelNames, labelIds, link } = ctx.request.body
    const result = await linkService.create(userId, title,belongPlatform, description, labelNames, labelIds, link)
    ctx.body = {
      code: 200,
      msg: '新增网文成功',
      result
    }
  }
   async list(ctx, next) {
    const { keyword } = ctx.request.query
    const result = await linkService.list(keyword)
    ctx.body = {
      code: 200,
      msg: '网文列表请求成功',
      result
    }
   }
}

module.exports = new LinkController()
