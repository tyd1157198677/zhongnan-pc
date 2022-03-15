import request from '../util/request'

export default { 

    /**
     * 【招采方案】新增或修改计划节点
     * @params{modeDate} 招采方案计划节点
    */
    SaveBidModeDate: (modeDate) => {
        return request({
            url: '/api/services/app/BidDate/SaveBidModeDate',
            method: 'post',
            data: modeDate
        })
    },

     /**
     *【招采方案】根据方案Id获取计划节点记录
     * @params{baseId} 招采方案id
     */
    GetBidModeDateByBaseId: (baseId) => {
        return request({
            url: '/api/services/app/BidDate/GetBidModeDateByBaseId',
            method: 'get',
            params: {
                baseId
            }
        })
    },

    /**
     * 【招采过程】新增或修改计划节点
     * @params{modeDate} 招采过程计划节点
    */
    SaveBidDate: (bidDate) => {
        return request({
            url: '/api/services/app/BidDate/SaveBidDate',
            method: 'post',
            data: bidDate
        })
    },

    /**
     *【招采过程】根据方案Id获取计划节点记录
    * @params{baseId} 招采方案id
    */
    GetBidDateByBaseId: (baseId) => {
        return request({
            url: '/api/services/app/BidDate/GetBidDateByBaseId',
            method: 'get',
            params: {
                baseId
            }
        })
    },

}