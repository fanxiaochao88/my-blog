const connection = require('../app/database')
class UserService {
  async create(username, password, email, phoneNumber, nickname, sex, company, baseAddress, bolgAddress, githubAddress, avatarCode) {
    const statement = `
      INSERT INTO user (username,password,email,phone_number,nickname,sex,company,base_address,bolg_address,github_address,avatar_url)
      VALUES(?,?,?,?,?,?,?,?,?,?,?);
    `
    let result
    try {
      result = await connection.execute(statement, [username, password, email, phoneNumber, nickname, sex, company, baseAddress, bolgAddress, githubAddress, avatarCode])
    } catch (error) {
      console.log(error)
    }
    return result[0]
  }

  async verifyUsername(username) {
    const statement = `
      SELECT * FROM user WHERE username=?;
    `
    const result = await connection.execute(statement, [username])
    return result[0]
  }

  async isHasEmail(email) {
    const statement = `
      SELECT * FROM user WHERE email=?;
    `
    const result = await connection.execute(statement, [email])
    return result[0]
  }

  async isHasPhone(phoneNumber) {
    const statement = `
      SELECT * FROM user WHERE phone_number=?;
    `
    const result = await connection.execute(statement, [phoneNumber])
    return result[0]
  }
}

module.exports = new UserService()
