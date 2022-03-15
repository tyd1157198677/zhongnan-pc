
const storeState = () => ({
    oriCats: []
})

const mutations = {

    /** 
     * 根据服务端拉取到的原始菜单列表初始化页面需要的菜单列表格式
     */
    init: (state, oriCats) => {
        // console.log(state.menus)
        state.oriCats = oriCats || []
    },
    clean: (state) => {
        state.oriCats = []
    }
}

export default {
    namespaced: true,
    state: storeState,
    mutations
}