import { ElMessage } from 'element-plus'
export const Message = (res: any, type?: string) => {
  if (type) {
    ElMessage({
      message: res.response.data.msg,
      type: 'error'
    })
    return
  }
  ElMessage({
    message: res.msg,
    type: res.code == 200 ? 'success' : 'error'
  })
}
