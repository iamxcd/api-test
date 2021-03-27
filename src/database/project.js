import db from '@/plugins/db'
import uuid from '@/plugins/uuid'

/**
 * project 集合
 * id 
 * uuid
 * title 项目名称
 * nodes 目录结构
 * created_at 创建时间
 */

export function getProjectList() {

}

export function getProject(id) {
    return db.project.get({ 'id': id })
}


export function createProject(title) {
    let data = {
        uuid: uuid(),
        title,
        nodes: []
    }
    return db.project.add(data)
}

/**
 * 
 * @param {*} name 
 * @param {*} type api 或者 folder
 * @returns 
 */
export function node(name = '未命名', type = 'api') {
    return {
        uuid: uuid(),//节点的ID
        name,
        type,
        api_uuid: null//关联的接口的ID
    }
}