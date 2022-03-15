import request from '../util/request'

/**
 *获取供方分类树
 *
 * @return {*} 
 */
const GetSupplierCategoryTree =function() {
    return request({
        url: '/api/services/app/SupplierTree/GetSupplierCategoryTree',
        method: 'get'
    })
}

/**
 *获取供方资质树
 *
 * @return {*} 
 */
const GetSupplierCertificateTree =function() {
    return request({
        url: '/api/services/app/SupplierTree/GetSupplierCertificateTree',
        method: 'get'
    })
}

export default {
    GetSupplierCategoryTree,
    GetSupplierCertificateTree
}