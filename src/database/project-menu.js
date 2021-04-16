import db from '@/plugins/db'
import uuid from '@/plugins/uuid'
import _ from 'lodash'

/**
 * project_menu 集合
 * id 
 * uuid
 * puuid 上级uuid
 * name 项目名称
 * type 文件夹|接口  api 或者 folder
 * api_uuid 关联的接口的ID
 */

export async function createMenu(name = '未命名', type = 'api', puuid = null) {
    let data = {
        uuid: uuid(),//节点的ID
        name,
        type,
        puuid,
        api_uuid: type == 'api' ? uuid() : null,
    }
    data = JSON.parse(JSON.stringify(data))
    data.id = await db.project_menu.add(data)
    return data
}

export async function getTreeMenu() {
    let data = await db.project_menu.toArray()
    let nodes = getTree(null, data)
    console.log(nodes)
}

export function renameName(id, name) {
    // console.log(name)
    return db.project_menu.update(id, { name })
}

export function delMenu(id) {
    return db.project_menu.delete(id)
}

export function getFolder() {

}


function getTree(pid, data) {
    let children = [];
    let items = _.filter(data, { puuid, pid });
    for (let index = 0; index < items.length; index++) {
        let tmp = items[i];
        tmp.children = getTree(tmp.uuid, data)
        children.push(tmp)
    }
    return $children;
}