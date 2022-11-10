const momentService = require('../service/moment.service')
const  { LABELS } = require('../app/config')
class MomentController {
  /**
   * 新增文章
   * @param {*} ctx
   * @param {*} next
   */
  async create(ctx, next) {
    // 拿到数据
    const userId = ctx.user.id
    const { title, content, labelNames, labelIds, description, mainCoverUrl } = ctx.request.body
    const result = await momentService.create(userId, title, content, labelNames, labelIds, description, mainCoverUrl)
    ctx.body = {
      code: 200,
      msg: '上传成功',
      result
    }
  }

  /**
   * 获取文章详情
   * @param {*} ctx
   * @param {*} body
   */
  async getMomentDetailById(ctx, body) {
    const { momentId } = ctx.request.params
    const result = await momentService.getMomentDetailById(momentId)
    ctx.body = {
      code: 200,
      msg: '请求成功',
      result
    }
  }
  async update(ctx, next) {
    // 修改文章
    const { momentId } = ctx.request.params
    const { title, content, labelNames, labelIds, description, mainCoverUrl } = ctx.request.body
    const result  = await momentService.update(momentId, title, content, labelNames, labelIds, description, mainCoverUrl)
    ctx.body = {
      code: 200,
      msg: '发布成功',
      result
    }
  }

  async getLabels(ctx, next) {
    ctx.body = {
      code: 200,
      msg: '标签列表请求成功',
      result: LABELS
    }
  }

  async list(ctx, next) {
    const result = await momentService.list()
    ctx.body = {
      code: 200,
      msg: '列表请求成功',
      result
    }
  }
}

module.exports = new MomentController()
