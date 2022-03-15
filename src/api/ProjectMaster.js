import request from '../util/request'

export default {
    /**
     * 获取项目树
     */
    GetProjectTree: () => {
        return request({
            url: '/api/services/app/ProjectMaster/GetProjectTree',
            method: 'get'
        })
    },
}
