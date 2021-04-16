import db from '@/plugins/db'
import uuid from '@/plugins/uuid'
import _ from 'lodash'
import store from "@/store";

/**
 * project_menu 集合
 * id 
 * uuid
 * parent_uuid 上级uuid
 * project_uuid 所属项目
 * name 项目名称
 * type 文件夹|接口  api 或者 folder
 * api_uuid 关联的接口的ID
 */

export async function createMenu(name = '未命名', type = 'api', parent_uuid = null) {
    let project_uuid = store.getters.curProject.uuid
    console.log(project_uuid)
    let data = {
        uuid: uuid(),//节点的ID
        name,
        type,
        parent_uuid,
        project_uuid,
        api_uuid: type == 'api' ? uuid() : null,
    }
    data = JSON.parse(JSON.stringify(data))
    data.id = await db.project_menu.add(data)
    return data
}

export async function getTreeMenu(project_uuid) {
    let data = await db.project_menu.where({ project_uuid }).toArray()
    return getTree(null, data)
}

export function renameName(id, name) {
    // console.log(name)
    return db.project_menu.update(id, { name })
}

export async function updateApiuuid(uuid, api_uuid) {
    let node = await db.project_menu.get({ uuid })
    return await db.project_menu.update(node.id, { api_uuid })
}

export function delMenu(id) {
    return db.project_menu.delete(id)
}

export async function getFolder() {
    let data = await db.project_menu.where({
        type: 'folder'
    }).toArray()
    console.log('获取文件夹列表', data)
    return getTree(null, data)
}


function getTree(pid, data) {
    let children = [];
    let items = _.filter(data, { parent_uuid: pid });
    for (let i = 0; i < items.length; i++) {
        let tmp = items[i];
        tmp.children = getTree(tmp.uuid, data)
        children.push(tmp)
    }
    return children;
}