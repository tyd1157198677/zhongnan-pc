import request from '../util/request'

export default {
    /**
     * 根据供应商Id获取所有资质【不分页】
     * @params{baseGuid} 供应商id 
     */
    GetSupplierCertificates: (baseGuid) => {
        return request({
            url: '/api/services/app/SupCertificate/GetSupplierCertificates',
            method: 'get',
            params: {
                baseGuid
            }
        })
    }
}