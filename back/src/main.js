const app = require('./app/index')
const config = require('./app/config')

app.listen(config.APP_PORT, () => {
  console.log(config.APP_PORT + '启动成功')
})