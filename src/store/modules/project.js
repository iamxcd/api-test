import router from "@/router"
import _ from 'lodash'
import { createProject, updateProject } from '@/database/project'

const state = {
    curProject: {
        id: null,
        uuid: null,
        title: '',
        nodes: []
    }
}
const getters = {
    curProject: state => state.curProject,
    nodes: state => state.curProject.nodes,
}
const mutations = {
    SET_CUR_PROJECT(state, project) {
        state.curProject = project
    },
    SET_NODES(state, nodes) {
        state.curProject.nodes = nodes
    }
}
const actions = {
    setCurProject({ commit }, project) {
        commit('SET_CUR_PROJECT', project)
    },
    setNodes({ commit, state }, nodes) {
        commit('SET_NODES', nodes)
        let id = state.curProject.id
        nodes = JSON.parse(JSON.stringify(nodes))
        updateProject(id, { nodes }).then(res => {
            // console.log('目录被修改', res, nodes)
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}