import request from '../util/request'

export default {
    /**
     * 根据供应商Id获取所有联系人【不分页】
     * @params{baseGuid} 供应商id 
     */
    GetSupplierContacters: (baseGuid) => {
        return request({
            url: '/api/services/app/SupContacter/GetSupplierContacters',
            method: 'get',
            params: {
                baseGuid
            }
        })
    },
}