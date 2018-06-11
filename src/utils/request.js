import axios from 'axios'
// import qs from 'qs'
import { Message } from 'element-ui'
import cache from '@/utils/cache'

// 创建axios实例
export const instance = axios.create({
    baseURL: process.env.BASE_API, // 根据配置环境的改变的baseURL（/config目录下进行修改）；不需要则直接注释或者改为自定义URL
    timeout: 10 * 1000 // 请求超时时间
})

// request拦截器
instance.interceptors.request.use(config => {
    // Do something before request is sent
    if (cache.getToken()) {
        config.headers['X-Token'] = cache.getToken() // 让每个请求携带token -- ['X-Token']为自定义key 请根据实际情况自行修改
        // config.headers['Authorization'] = `Bearer ${cache.getToken()}` // 示例
    }
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
})

// respone拦截器
instance.interceptors.response.use(response => {
    const res = response.data
    if (res && res.errorMessage) {
        return Promise.reject(res.errorMessage)
    }
    return Promise.resolve(res)
}, error => {
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    })
    return Promise.reject(error)
})

export const request = async (url = '', type = 'GET', data = {}) => {
    let result
    type = type.toUpperCase()

    if (type === 'GET') {
        await instance.get(url, { params: data })
            .then(res => {
                result = res
            })
    } else if (type === 'POST') {
        // await instance.post(url, qs.stringify(data))  // 发送json格式需转字符串的场景下可打开
        // 根据反馈，post请求的qs转字符有时候会发生不必要的麻烦（场景：发送表单格式和无需转字符串的请求）
        await instance.post(url, data)
            .then(res => {
                result = res
            })
    }
    return result
}
