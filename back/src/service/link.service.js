const connection = require('../app/database')

class LinkService {
  async create(userId, title, belongPlatform, description, labelNames, labelIds, link) {
    const statement = `
      INSERT INTO link_moment (user_id, title,belong_platform, description, label_names, label_ids, link) VALUES (?,?,?,?,?,?,?);
    `
    let result
    try {
      result = await connection.execute(statement, [userId, title, belongPlatform, description, labelNames, labelIds, link])
    } catch (error) {
      console.log(error)
    }
    return result[0]
  }

  async list(keyword) {
    let statement
    if (keyword) {
      statement = `
      SELECT 
      link_moment.id, link_moment.belong_platform, link_moment.title, link_moment.label_ids, link_moment.label_names, link_moment.description, link_moment.link,  link_moment.createAt,
      JSON_OBJECT('id', user.id, 'nickname', user.nickname, 'avatarUrl', user.avatar_url) author
      FROM link_moment 
      LEFT JOIN user ON user.id = link_moment.user_id
      WHERE 
      link_moment.title LIKE '%${keyword}%'
      `
    } else {
      statement = `
      SELECT 
      link_moment.id, link_moment.belong_platform, link_moment.title, link_moment.label_ids, link_moment.label_names, link_moment.description, link_moment.link,  link_moment.createAt,
      JSON_OBJECT('id', user.id, 'nickname', user.nickname, 'avatarUrl', user.avatar_url) author
      FROM link_moment 
      LEFT JOIN user ON user.id = link_moment.user_id
      `
    }

    let result
    try {
      result = await connection.query(statement)
    } catch (error) {
      console.log(error)
    }
    return result[0]
  }
}

module.exports = new LinkService()
