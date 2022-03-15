import request from '../util/request'

export default {
    /**
     * 供应商上传附件模块获取列表
     * @params{baseGuid} 
     */
    GetUploadAttach: (baseGuid) => {
        return request({
            url: '/api/services/app/SupAttach/GetUploadAttach',
            method: 'get',
            params: {
                baseGuid
            }
        })
    },
}