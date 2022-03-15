import request from '../util/request'

export default { 

    /**
     * 新增或修改【招采方案-入围标准】
     * @params{modeRequire} 入围标准信息
    */
   InsertOrUpdateBidModeRequire: (modeRequire) => {
        return request({
            url: '/api/services/app/BidModeRequire/InsertOrUpdateBidModeRequire',
            method: 'post',
            data: modeRequire
        })
    },

     /**
     * 获取已经存在的入围条件信息-页面初始化填充内容
     * @params{baseId} 方案id
     */
    GetOneBidModeRequireById: (baseId) => {
        return request({
            url: '/api/services/app/BidModeRequire/GetOneBidModeRequireById',
            method: 'get',
            params: {
                baseId
            }
        })
    },

    /**
     * 删除某个已添加的资质
     * @params{cer} cer
    */
    DeleteRequireCer: (cer) => {
        return request({
            url: '/api/services/app/BidModeRequire/DeleteRequireCer',
            method: 'post',
            data: cer
        })
    },

}