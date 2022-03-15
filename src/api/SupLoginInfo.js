import request from '../util/request'

export default {

    /**
     * 新增或修改供应商登录账号信息
     * @params{loginInfo} 
     */
    InsertOrUpdateSupLoginInfo: (loginInfo) => {
        return request({
            url: '/api/services/app/SupLoginInfo/InsertOrUpdateSupLoginInfo',
            method: 'post',
            data: loginInfo
        })
    },
    /**
     * 根据baseGuid获取一条登录信息
     * @params{baseGuid} 
     */
    GetOneSupLoginInfoByBaseGuid: (baseGuid) => {
        return request({
            url: '/api/services/app/SupLoginInfo/GetOneSupLoginInfoByBaseGuid',
            method: 'get',
            params: { baseGuid }
        })
    },
}
