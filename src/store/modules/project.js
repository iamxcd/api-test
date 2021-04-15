import router from "@/router"
import _ from 'lodash'
import { createProject, updateProject } from '@/database/project'

const state = {
    curProject: {
        title: '',
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
    async setCurProject({ commit }, project) {
        if (project.id) {
            id = await updateProject(project.id, project)
        } else {
            id = await createProject(project.title)
        }
        commit('SET_CUR_PROJECT', project)
    },
    async setNodes({ commit, state }, nodes) {
        commit('SET_NODES', nodes)
        console.log(state.curProject)
        // id = await updateProject(state.curProject.id)
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}