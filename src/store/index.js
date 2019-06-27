import Vue from 'vue'
import Vuex from 'vuex'
import cache from '@/utils/cache'

Vue.use(Vuex)

const state = {
    logs: [],
    sidebarStatus: cache.getCookie('sidebarStatus') !== 'false'
}
const getters = {
}
const mutations = {
    SET_LOGS(state, error) {
        state.logs.unshift(error)
    },
    SET_SIDEBAR_STATUS(state) {
        let status = !state.sidebarStatus
        state.sidebarStatus = status
        cache.setCookie('sidebarStatus', status)
    }
}
const actions = {
}

// 自动引入和注册modules下的文件
const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    return modules
}, {})

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules
})
