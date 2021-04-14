import db from '@/plugins/db'
import uuid from '@/plugins/uuid'

/**
 * api 定义
 * id
 * uuid
 * title 接口名称
 * url 请求地址
 * method 请求方法
 * params 请求参数
 * headers 请求头
 * body 请求体
 */


export function getApi(uuid) {
    return db.api.get({ 'uuid': uuid })
}


export function storeApi(uuid, title, url, method, params = {}, headers = {}, body = "") {
    let data = {
        uuid,
        title,
        method,
        params,
        headers,
        body
    }
    return db.api.add(data)
}


export function putApi() {

}