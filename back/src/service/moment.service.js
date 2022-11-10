const connection = require('../app/database')

class MomentService {
  async create(id, title, content, labelNames, labelIds, description, mainCoverUrl) {
    const statement = `
      INSERT INTO moment (user_id, title, content,label_names, label_ids, description, main_cover_url) VALUES(?,?,?,?,?,?,?);
    `
    const result = await connection.execute(statement, [id, title, content, labelNames, labelIds, description, mainCoverUrl])
    return result[0]
  }

  async getMomentDetailById(momentId) {
    const statement = `
    SELECT 
    moment.id, moment.title, moment.label_ids, moment.label_names, moment.description, moment.main_cover_url, moment.content,  moment.createAt, 
    JSON_OBJECT('id', user.id, 'nickname', user.nickname, 'avatarUrl', user.avatar_url) author
    FROM moment 
    LEFT JOIN user ON user.id = moment.user_id
    WHERE moment.id = ?;
    `
    try {
      const result = await connection.execute(statement, [momentId])
      return result[0][0]
    } catch (error) {
      console.log(error)
    }
  }
  async update(momentId, title, content, labelNames, labelIds, description, mainCoverUrl) {
    console.log(111)
    const statement = `
      UPDATE moment SET title=?,content=?, label_names=?, label_ids=?, description=?, main_cover_url=? WHERE id=?
    `
    const result = await connection.execute(statement, [title, content, labelNames, labelIds, description, mainCoverUrl, momentId])
    console.log(222)
    return result[0]
  }

  async list() {
    const statement = `
    SELECT 
    moment.id, moment.title, moment.label_ids, moment.label_names, moment.description, moment.main_cover_url,  moment.createAt, 
    JSON_OBJECT('id', user.id, 'nickname', user.nickname, 'avatarUrl', user.avatar_url) author
    FROM moment 
    LEFT JOIN user ON user.id = moment.user_id
    `
    try {
      const result = await connection.execute(statement)
      return result[0]
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MomentService()
