import request from '../util/request'

export default {

    /**
     * 保存标段信息
     * @params{plan} 招采信息
    */
    SaveBidModeSection: (section) => {
        return request({
            url: '/api/services/app/BidModeSection/SaveBidModeSection',
            method: 'post',
            data: section
        })
    },
    
    /**
     * 获取招采方案下所有标段列表【不分页】
     * @params{query} 筛选条件
     */
    GetBidModeSectionList: (baseId) => {
        return request({
            url: '/api/services/app/BidModeSection/GetBidModeSectionList',
            method: 'get',
            params: {
                baseId
            }
        })
    }
}