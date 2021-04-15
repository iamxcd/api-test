import router from "@/router"
import _ from 'lodash'
import uuid from '@/plugins/uuid'
import { ElMessageBox } from 'element-plus';


function closeTag(index, state, key) {
    state.tagList.splice(index, 1)
    if (router.currentRoute._value.params.key == key) {
        let path = '/'
        let title
        if (state.tagList.length != 0) {
            if (index == 0) {
                let _key = state.tagList[0].key
                title = state.tagList[0].title
                path = `/api/${_key}`
            } else {
                let _key = state.tagList[index - 1].key
                title = state.tagList[0].title
                path = `/api/${_key}`
            }

        }
        router.push({
            path: path,
            query: {
                title,
            }
        })
    }
}

const state = {
    tagList: [
        // {
        //     title: '接口名',
        //     key: '3320cc226f264022a457c5e23f6cbba5',
        //     is_saved: true
        // }
    ],
}
const getters = {
    tags: state => state.tagList
}
const mutations = {
    CLOSE_TAG(state, key) {
        let index = _.findIndex(state.tagList, { 'key': key })
        if (index > -1) {
            let tag = state.tagList[index]
            if (!tag.is_saved) {
                ElMessageBox.confirm('当前接口未保存, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    closeTag(index, state, key)
                }).catch(() => {
                    console.log('取消关闭')
                });
            } else {
                closeTag(index, state, key)
            }
        }
        console.log('index:', index);
    },
    ADD_TAG(state) {
        let key = uuid()
        let title = '未命名'
        state.tagList.push({
            title,
            key,
            is_saved: false
        });
        router.push({
            path: `/api/${key}`,
            query: {
                title,
            }
        })
    },
    OPEN_TAG(state, { key, title }) {
        console.log(key, title)
        let isset = state.tagList.some(function (item) {
            return item.key == key
        })

        if (!isset) {
            state.tagList.unshift({
                title,
                key,
                is_saved: true
            })
        }
        router.push({
            path: `/api/${key}`,
            query: {
                title
            }
        })
    },
    RENAME_TAG(state, { key, title }) {
        let tag = _.find(state.tagList, { 'key': key })
        tag.title = title
        // TODO 同步到数据库
    },
    SET_ISSAVED(state, { key, is_saved }) {
        let index = _.findIndex(state.tagList, { 'key': key })
        if (index > -1) {
            state.tagList[index].is_saved = is_saved
        }
    }
}
const actions = {
    closeTag({ commit }, key) {
        commit('CLOSE_TAG', key)
    },
    addTag({ commit }) {
        commit('ADD_TAG');
    },
    openTag({ commit }, { key, title }) {
        commit('OPEN_TAG', { key, title });
    },
    renameTag({ commit }, { key, title }) {
        commit('RENAME_TAG', { key, title });
    },
    setIsSaved({ commit }, { key, is_saved }) {
        commit('SET_ISSAVED', { key, is_saved });
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}