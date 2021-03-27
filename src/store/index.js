import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import tags from './modules/tags'
import project from './modules/project'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tags,
    project
  },
  plugins: [createPersistedState()],
})
