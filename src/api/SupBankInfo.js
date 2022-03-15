import request from '../util/request'

export default {
    /**
     * 根据Id获取银行账号信息
     * @params{baseInfo} 
     */
    GetOneSupBankInfoById: (baseGuid) => {
        return request({
            url: '/api/services/app/SupBankInfo/GetOneSupBankInfoById',
            method: 'get',
            params: {
                baseGuid
            }
        })
    },
}