import db from '@/plugins/db'
import uuid from '@/plugins/uuid'

/**
 * api 定义
 * id
 * uuid
 * title 接口名称
 * url 请求地址
 * node_uuid 关联目录节点uuid
 * project_uuid 关联项目的uuid
 * method 请求方法
 * params 请求参数
 * headers 请求头
 * body 请求体
 */


export function getApi(uuid) {
    console.log('获取接口信息', uuid)
    return db.api.get({ 'uuid': uuid })
}


export function storeApi(data) {
    return db.api.add(data)
}


export function updateApi() {

}