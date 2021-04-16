import router from "@/router"
import _ from 'lodash'
import { createProject, updateProject } from '@/database/project'
import { getTreeMenu } from '@/database/project-menu'

const state = {
    curProject: {
        id: null,
        uuid: null,
        title: ''
    },
    nodes: []
}
const getters = {
    curProject: state => state.curProject,
    nodes: state => state.nodes,
}
const mutations = {
    SET_CUR_PROJECT(state, project) {
        state.curProject = project
    },
    SET_NODES(state, nodes) {
        state.nodes = nodes
    }
}
const actions = {
    setCurProject({ commit }, project) {
        commit('SET_CUR_PROJECT', project)
    },
    getNodes({ commit }) {
        getTreeMenu().then(nodes => {
            commit('SET_NODES', nodes)
            console.log('vuex 设置目录', nodes)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}