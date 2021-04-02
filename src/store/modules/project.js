import router from "@/router"
import _ from 'lodash'

const state = {
    curProject: {
        nodes: []
    }
}
const getters = {
    curProject: state => state.curProject,
    nodes: state => state.curProject ? state.curProject.nodes : [],
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
    setNodes({ commit }, nodes) {
        commit('SET_NODES', nodes)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}