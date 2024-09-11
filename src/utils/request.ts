import axios from 'axios'
import { apiRoutes } from '~/apis/api'

const instance = axios.create({
  baseURL: 'http://192.168.1.110:7001',
  timeout: 10000,
})

instance.interceptors.response.use(
  response => response,
  error => {
    const { response } = error
    if (response) {
      const { status } = response
      if (status >= 500) {
        // 服务端报错
      }
      else if (status === 400) {
        // 接口参数异常
      }
      else if (status === 401) {
        // 登陆信息过期，需要重新登陆
      }
      else {
        // 其它错误类型，统一按照接口报错处理
      }
    }
    else {
      // 网络异常
    }
    return Promise.reject(error)
  },
)

export function request<T, k>(name: string, data: T) {
  const api = apiRoutes[name]

  if (!api)
    throw new Error('api not found')

  const { url, method } = api

  return method === 'get' ? get<T, k>(url, data) : post<T, k>(url, data)
}

export function get<T, K>(url: string, params: T) {
  return instance.get<K>(url, { params })
}

export function post<T, K>(url: string, data: T) {
  return instance.post<K>(url, { data })
}
