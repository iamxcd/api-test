// 给请求添加 http 或 https前缀
export default (config) => {
    if (config.url.search(/^[http|https]/i) == -1) {
        config.url = 'http://' + config.url
    }
}