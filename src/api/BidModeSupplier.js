import request from '../util/request'

export default { 

    /**
     * 判断是否需要邀请供方 如果需要则返回true，如果返回false则展示message内容
     * @params{baseId} 方案id
     */
    CheckHaveSupplier: (baseId) => {
        return request({
            url: '/api/services/app/BidModeSupplier/CheckHaveSupplier',
            method: 'get',
            params: {
                baseId
            }
        })
    },

    /**
     * 保存供方信息
     * @params{modeRequire} 入围标准信息
    */
    SaveSupplier: (supplier) => {
        return request({
            url: '/api/services/app/BidModeSupplier/SaveSupplier',
            method: 'post',
            data: supplier
        })
    },

     /**
     * 获取已邀请的供方列表
     * @params{query} query
     */
    GetBidModeSupplierList: (query) => {
        return request({
            url: '/api/services/app/BidModeSupplier/GetBidModeSupplierList',
            method: 'get',
            params: query
        })
    },

    /**
     * 删除已选择的供方
     * @params{id} id
    */
    DeleteBidModeSupplier: (id) => {
        return request({
            url: '/api/services/app/BidModeSupplier/DeleteBidModeSupplier',
            method: 'post',
            data: {
                id
            }
        })
    },

}
