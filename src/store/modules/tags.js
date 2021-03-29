import router from "@/router"
import _ from 'lodash'
import uuid from '@/plugins/uuid'

const state = {
    tagList: [
        // {
        //     title: '接口名',
        //     key: '3320cc226f264022a457c5e23f6cbba5'
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
            state.tagList.splice(index, 1)
            if (router.currentRoute._value.params.key == key) {
                let path = '/'
                if (state.tagList.length != 0) {
                    if (index == 0) {
                        let _key = state.tagList[0].key
                        path = `/api/${_key}`
                    } else {
                        let _key = state.tagList[index - 1].key
                        path = `/api/${_key}`
                    }

                }
                router.push({ path: path })
            }
        }
        console.log('index:', index);
    },
    ADD_TAG(state) {
        let key = uuid()
        state.tagList.push({
            title: "未命名",
            key: key,
        });
        router.push({ path: `/api/${key}` })
    },
    OPEN_TAG(state, { key, title }) {
        console.log(key, title)
        let isset = state.tagList.some(function (item) {
            return item.key == key
        })

        if (!isset) {
            state.tagList.unshift({
                title,
                key
            })
        }
        router.push(`/api/${key}`)
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
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}