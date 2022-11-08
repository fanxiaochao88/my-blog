import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import localCache from '@/utils/cache'

class QR_Request {
  // axios实例
  instance: AxiosInstance
  // 以类的形式封装
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 所有实例对象(类的级别)都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const token = window.localStorage.getItem('token')
        token && config.headers && (config.headers['Authorization'] = `Bearer ${token}`)
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    // 具体的接口级别的拦截器,可以在config里面判断来进行
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    // 默认是有loading的,防止下面修改,影响后续接口的loading效果
    return new Promise((resolve, reject) => {
      this.instance.request<any, T>(config).then(
        (res) => {
          resolve(res)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  get<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' })
  }
  patch<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'patch' })
  }
}

export default QR_Request
