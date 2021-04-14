import axios from 'axios'

import urlPrefix from './middleware/url-prefix'
// 中间件
let middleware = [
    urlPrefix
];



const instance = axios.create({
    baseURL: ''
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    middleware.forEach(handel => {
        handel(config)
    })
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default instance