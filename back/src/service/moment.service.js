const connection = require('../app/database')

class MomentService {
  async create(id, title, content, labelNames, labelIds, description, mainCoverUrl) {
    console.log(1111)
    const statement = `
      INSERT INTO moment (user_id, title, content,label_names, label_ids, description, main_cover_url) VALUES(?,?,?,?,?,?,?);
    `
    let result
    try {
      result = await connection.execute(statement, [id, title, content, labelNames, labelIds, description, mainCoverUrl])
    } catch (error) {
      console.log(error)
    }
    return result[0]
  }

  async getMomentDetailById(momentId) {
    const statement = `
    SELECT 
    moment.id, moment.title, moment.label_ids, moment.label_names, moment.description, moment.main_cover_url, moment.content,  moment.createAt, moment.view_count,
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

  async list(keyword) {
    let statement
    if (keyword) {
      statement = `
      SELECT 
      moment.id, moment.title, moment.label_ids, moment.label_names, moment.description, moment.main_cover_url,  moment.createAt, moment.view_count,
      JSON_OBJECT('id', user.id, 'nickname', user.nickname, 'avatarUrl', user.avatar_url) author
      FROM moment 
      LEFT JOIN user ON user.id = moment.user_id
      WHERE 
      moment.title LIKE '%${keyword}%'
      `
    } else {
      statement = `
      SELECT 
      moment.id, moment.title, moment.label_ids, moment.label_names, moment.description, moment.main_cover_url,  moment.createAt, moment.view_count,
      JSON_OBJECT('id', user.id, 'nickname', user.nickname, 'avatarUrl', user.avatar_url) author
      FROM moment 
      LEFT JOIN user ON user.id = moment.user_id
      `
    }
    try {
      const result = await connection.query(statement)
      return result[0]
    } catch (error) {
      console.log(error)
    }
  }

  async addMomentViewCount(id, count) {
    const statement = `
      UPDATE moment SET view_count=? WHERE id=?;
    `
    await connection.execute(statement, [count, id])
  }
}

module.exports = new MomentService()
