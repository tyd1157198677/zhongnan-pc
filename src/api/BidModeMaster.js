import request from '../util/request'

export default { 

    /**
     * 新增或修改招采方案
     * @params{plan} 招采信息
    */
    InsertOrUpdateBidModeMaster: (mode) => {
        return request({
            url: '/api/services/app/BidModeMaster/InsertOrUpdateBidModeMaster',
            method: 'post',
            data: mode
        })
    },

     /**
     *获取招采方案列表（分页）
     * @params{query} 筛选条件
     */
    GetBidModeMasterList: (query) => {
        return request({
            url: '/api/services/app/BidModeMaster/GetBidModeMasterList',
            method: 'get',
            params: query
        })
    },

    /**
     * 获取招采方案所有下拉
    */
   GetBidModeSearchDropDown: () => {
        return request({
            url: '/api/services/app/BidModeMaster/GetBidModeSearchDropDown',
            method: 'get'
        })
    },


        
    /**
     * 此模块没有新增的功能，用户打开【基本信息】模块后首先获取数据
     * @params{id} id
    */
    GetOneBidMasterById: (baseId) => {
        return request({
            url: '/api/services/app/BidModeMaster/GetOneBidMasterById',
            method: 'get',
            params: {
                baseId
            }
        })
    },

    /**
     * /api/services/app/BidModeMaster/GetBidModeBaseInfo
     * @params{id} id
    */
    GetBidModeBaseInfo: (baseId) => {
        return request({
            url: '/api/services/app/BidModeMaster/GetBidModeBaseInfo',
            method: 'get',
            params: {
                id: baseId
            }
        })
    },

    /**
     * 删除招采方案 同时删除招采方案与招采计划关系表
     * @params{id} id
    */
    DeleteBidModeMasterById: (id) => {
        return request({
            url: '/api/services/app/BidModeMaster/DeleteBidModeMasterById',
            method: 'post',
            data: {
                id
            }
        })
    },
 /**
   * 根据BaseId获取招采方案附件列表
   * @params{baseId} baseId
   */
  GetBidModeAttachList: (baseId) => {
    return request({
      url: "/api/services/app/BidAttach/GetBidModeAttachList",
      method: "get",
      params:{
        baseId
      }
    });
  },
      /**
   * 删除招标方案公告附件
   * @params{form} form
   */
  DeleteBidAttachById: (id) => {
    return request({
      url: "/api/services/app/BidAttach/DeleteBidAttachById",
      method: "post",
      data:{
          id
      }
    });
  },
   /**
   * 根据BaseId检查招采方案是否符合提交条件
   * @params{baseId} baseId
   */
  CheckSubmit:(baseId)=>{
    return request({
        url: "/api/services/app/BidModeMaster/CheckSubmit",
        method: "get",
        params:{
          baseId
        }
      });
  },    
   /**
  * 提交招采方案
  * @params{form} form
  */
 SubmitBidMode: (id) => {
   return request({
     url: "/api/services/app/BidModeMaster/SubmitBidMode",
     method: "post",
     data:{
         id
     }
   });
 },
}