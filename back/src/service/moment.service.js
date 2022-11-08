const connection = require('../app/database')

class MomentService {
  async create(id, title, content) {
    const statement = `
      INSERT INTO moment (user_id, title, content) VALUES(?,?,?);
    `
    const result = await connection.execute(statement, [id, title, content])
    return result[0]
  }

  async getMomentDetailById(momentId) {
    const statement = `
    SELECT 
    moment.id, moment.title, moment.content, moment.createAt, 
    JSON_OBJECT('id', user.id, 'nickname', user.nickname, 'avatarUrl', user.avatar_url) author
    FROM moment 
    LEFT JOIN user ON user.id = moment.user_id
    WHERE moment.id = ?;
    `
    const result = await connection.execute(statement, [momentId])
    return result[0][0]
  }
  async update(momentId, title, content) {
    const statement = `
      UPDATE moment SET title=?,content=? WHERE id=?
    `
    const result = await connection.execute(statement, [title, content, momentId])
    return result[0]
  }
}

module.exports = new MomentService()
