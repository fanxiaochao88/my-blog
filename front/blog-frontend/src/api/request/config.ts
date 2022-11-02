// 方式一,手动切换,不推荐
// const BASE_URL = 'base_url_dev'
// const BASE_NAME = 'base_name_dev'

// 方式二,根据process.env.NODE_ENV
const BASE_URL = process.env.VUE_APP_BASE_URL
const TIME_OUT = 10000

// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = '/xPlatform'
// } else if (process.env.NODE_ENV === 'prodution') {
//   BASE_URL = 'prod-url'
// }

export { TIME_OUT, BASE_URL }

// console.log(process.env.NODE_ENV)

// 方式三  VUE CLI支持的
