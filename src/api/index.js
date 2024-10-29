import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useStore } from '../store'
export const authHeader = {
  Authorization:
    'Basic TmdpbnhBdXRoVXNlcm5hbWUxNjM4MWVmYTA2OWE5MGNiZGU5OTg1NGM4MTE4MzAzNmE0YmQyZTQ3NzZlYjc3MGZhNjk3NDBmMWM1YzA2YWE0Ok5naW54QXV0aFBhc3N3b3JkZTA1ODhlM2IzYzViMjQwZmUzZjVmYjY1M2QyOTkwZjM0YjUyZWUwYjU5NWFjZjY1NTNhOTI0YjA3MTZjYjM2Ng=='
}
const request = axios.create({
  auth: {
    username: 'NginxAuthUsername16381efa069a90cbde99854c81183036a4bd2e4776eb770fa69740f1c5c06aa4',
    password: 'NginxAuthPassworde0588e3b3c5b240fe3f5fb653d2990f34b52ee0b595acf6553a924b0716cb366'
  },
  timeout: 15000,
  timeoutErrorMessage: '请求超时'
})
const basicPost = request.post
request.post = async (url, data, config = { message: false, loading: false }, header) => {
  if (config.loading) useStore().setLoading(true)
  return basicPost(url, data, config, header)
    .then(response => {
      if (response.Code != '200') {
        ElMessage({
          type: 'error',
          message: '请求失败：' + (response.msg || response.Msg || '')
        })
        console.warn('请求失败：', response)
        throw new Error('请求失败')
      }
      if (config?.message) {
        ElMessage({
          type: 'success',
          message: '请求成功:' + response.msg
        })
      }
      return response
    })
    .catch(error => {
      ElMessage({
        type: 'error',
        message: '请求失败:' + error.message
      })
    })
    .finally(() => {
      if (config.loading) useStore().setLoading(false)
    })
}

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)
export { request }
