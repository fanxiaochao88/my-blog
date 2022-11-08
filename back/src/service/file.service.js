const connection = require('../app/database')

class FileService {
  async saveAvatar(mimetype, filename, size) {
    const statement = `
      INSERT INTO avatar (filename,mimetype,size) VALUES (?,?,?);
    `
    const result = await connection.execute(statement, [filename, mimetype, size])

    const statement2 = `
      SELECT * FROM avatar WHERE filename = ?;
    `
    const result2 = await connection.execute(statement2, [filename])
    return `http://localhost:8001/upload/avatar/${result2[0][0].id}`
  }

  async getAvatarById(avatarId) {
    const statement = `
      SELECT * FROM avatar WHERE id = ?;
    `
    const result = await connection.execute(statement, [avatarId])
    return result[0][0]
  }

  async savePicture(userId, momentId, mimetype, filename, size) {
    const statement = `
      INSERT INTO picture (user_id, moment_id, mimetype, filename, size) VALUES (?,?,?,?,?);
    `
    const result = await connection.execute(statement, [userId, momentId, mimetype, filename, size])
    return result[0]
  }

  async getPictureByFilename(filename) {
    const statement = `
      SELECT * FROM picture WHERE filename = ?;
    `
    const result = await connection.execute(statement, [filename])
    return result[0][0]
  }

  async getPictureById(id) {
    const statement = `
      SELECT * FROM picture WHERE id = ?;
    `
    const result = await connection.execute(statement, [id])
    return result[0][0]
  }
}

module.exports = new FileService()
