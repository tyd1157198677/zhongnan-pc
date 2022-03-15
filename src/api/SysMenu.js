import request from '../util/request'


/**
 *加载当前用户的菜单列表
 *
 * @return {*} 
 */
function LoadUserMenus() {
    return request({
        url: '/api/services/app/SysMenu/GetUserMenus',
        method: 'get'
    })
}

export default {
    LoadUserMenus
}
