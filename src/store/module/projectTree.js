
const storeState = () => ({
    projects: []
})

const mutations = {

    /** 
     * 项目树
     */
    init: (state, projects) => {
        state.projects = projects || []
    },
    clean: (state) => {
        state.projects = []
    }
}

export default {
    namespaced: true,
    state: storeState,
    mutations
}