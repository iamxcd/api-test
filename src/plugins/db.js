import Dexie from 'dexie'
import { createProject, getProject } from '@/database/project'
import store from '@/store'
const db = new Dexie('apitest')
db.version(1).stores({
    project: '++id, &uuid',
    project_menu: '++id, &uuid, project_uuid, type',
    api: '++id , &uuid , project_uuid, node_uuid'
})


/**
 * 数据库初始化
 */
export const dbInit = async () => {
    console.log('初始化数据库')
    let count = await db.project.count()
    console.log('数量', count)
    if (count == 0) {
        let id = await createProject('未命名项目')
        console.log('返回值', id)
    }

    if (store.getters.curProject.id == null) {
        console.log('从数据库中取值 赋给vuex')
        let project = await db.project.toCollection().first()
        store.dispatch("setCurProject", project);
    }
}

export default db