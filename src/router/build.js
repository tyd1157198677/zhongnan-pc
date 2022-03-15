//动态生成菜单路由

/**
 *根据已经处理过的多级菜单来生成routes
 *
 * @export
 * @param {*} menus
 */
function build(menus) {
    /**
       {
           path: '/SuppInfo/UnList',
           name: 'gfxx-unlist',
           component: () => import("../views/SuppInfo/UnList.vue"),
       },
        */
    let routes = []
    if (menus && menus.length > 0) {
        menus.forEach(x => {
            // console.log(x)
            //需要判断是否加入一级菜单的路由：有子菜单时要忽略一级菜单
            let ignore = x.pid == '00000000-0000-0000-0000-000000000000'
            if (ignore) {
                ignore = x.subMenus && x.subMenus.length > 0
            }
            if (!ignore) {
                const { path, cmp } = x.route
                if (path && cmp) {
                    routes.push({
                        path: path,
                        name: x.index,
                        component: () =>
                            import (`../views${cmp}`)
                    })
                }
            }
            routes = routes.concat(build(x.subMenus))
        })
    }
    return routes
}

function fullBuild(menus) {
    let routes = build(menus)
    if (routes && routes.length > 0) { //手动添加一个/home
        let home = routes[0]
        home = {...home, ... { name: 'home' } }
        routes = [home].concat(routes)
    }
    return routes
}

export default fullBuild