import axios from 'axios'
import { Message } from 'element-ui'
import cache from '@/utils/cache'

export const instance = axios.create({
    baseURL: window.g.BASE_URL,
    timeout: 20 * 1000
})

// request
instance.interceptors.request.use(config => {
    if (cache.getToken()) {
        config.headers['Authorization'] = `Bearer ${cache.getToken()}`
    }
    return config
}, error => {
    Promise.reject(error)
})

// response
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
        duration: 3 * 1000
    })
    return Promise.reject(error)
})

/*
* request方法
* url       请求URL
* type      请求类型
* data      参数
* isForm    是否表单数据（只适用POST方法）
*/
export const request = async (url = '', type = 'GET', data = {}, isForm = false) => {
    let result
    type = type.toUpperCase()

    if (type === 'GET') {
        await instance.get(url, { params: data }).then(res => {
            result = res
        })
    } else if (type === 'POST') {
        if (isForm) {
            let form = new FormData()
            Object.keys(data).forEach(key => {
                form.append(key, data[key])
            })
        }
        await instance.post(url, data, {
            headers: {
                'Content-type': isForm ? 'multipart/form-data' : 'application/x-www-form-urlencoded'
            }
        }).then(res => {
            result = res
        })
    }
    return result
}
