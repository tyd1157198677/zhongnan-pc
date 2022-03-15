import request from '../util/request'

export default {

    /**
     * 考察分类弹框
    */
    GetSupplierCategoryTree: (query) => {
        return request({
            url: '/api/services/app/SupplierTree/GetSupplierCategoryTree',
            method: 'get',
            params: query
        })
    },
    
    /**
     *考察目的、考察报告，下拉获取
     */
    GetAllDropDown: (query) => {
        return request({
            url: '/api/services/app/InvesMaster/GetAllDropDown',
            method: 'get',
            params: query
        })
    },

    /**
     *考察打分模板下拉
     */
    GetInvesTempletList: (query) => {
        return request({
            url: '/api/services/app/InvesTemplet/GetInvesTempletList',
            method: 'get',
            params: query
        })
    },

    /**
     *新增或修改考察主题信息
     */
    SaveInvesMaster: (query) => {
        return request({
            url: '/api/services/app/InvesMaster/SaveInvesMaster',
            method: 'post',
            data: query
        })
    },

    /**
     *获取考察主题分页记录
     */
    GetInvesMasterList: (query) => {
        return request({
            url: '/api/services/app/InvesMaster/GetInvesMasterList',
            method: 'get',
            params: query
        })
    },

    /**
     *获取列表页面所有搜索下拉 适用于：我发起的考察、我参与的考察、考察查询
     */
    GetSearchDropDown: (query) => {
        return request({
            url: '/api/services/app/InvesMaster/GetSearchDropDown',
            method: 'get',
            params: query
        })
    },



    /**
     *保存考察供应商信息
     */
    SaveInvesSupplier2: (query) => {
        return request({
            url: '/api/services/app/InvesSupplier/SaveInvesSupplier',
            method: 'post',
            data: query
        })
    },

    /**
     *获取已添加的供应商列表
     */
    GetInvesSupplierList: (query) => {
        return request({
            url: '/api/services/app/InvesSupplier/GetInvesSupplierList',
            method: 'get',
            params: query
        })
    },

    /**
     *删除已添加的供应商
     */
    DeleteInvesSupplierById: (id) => {
        return request({
            url: '/api/services/app/InvesSupplier/DeleteInvesSupplierById',
            method: 'post',
            data: id
        })
    },

    /**
     *发起考察页面获取参与考察的人员列表
     */
    GetInvesDepartmentPerson: (query) => {
        return request({
            url: '/api/services/app/InvesPerson/GetInvesDepartmentPerson',
            method: 'get',
            params: query
        })
    },

    /**
     *保存考察人员信息
     */
    SaveInvesPerson: (query) => {
        return request({
            url: '/api/services/app/InvesPerson/SaveInvesPerson',
            method: 'post',
            data: query
        })
    },


    /**
     *清空人员
     */
    ClearDepartmentPerson: (query) => {
        return request({
            url: '/api/services/app/InvesPerson/ClearDepartmentPerson?masterId='+query.masterId+'&depGuid='+query.depGuid,
            method: 'post'
        })
    },

    /**
     *提交考察信息
     */
    SubmitInves: (query) => {
        return request({
            url: '/api/services/app/InvesMaster/SubmitInves',
            method: 'post',
            data: query
        })
    },

  SubmitInvesMaster: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoMaster/SubmitInvesMaster',
      method: 'post',
      data: query
    })
  },


  GetLianDoInvesSupplierList: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoMaster/GetLianDoInvesSupplierList',
      method: 'get',
      params: query
    })
  },


    /**
     *获取考察查询分页列表
     */
    GetSupplierList: (query) => {
        return request({
            url: '/api/services/app/InvesMaster/GetSupplierList',
            method: 'get',
            params: query
        })
    },

    /**
     *供方考察-【考察打分】待办打开后界面展示内容
     */
    ShowScoreItemForPerson: (query) => {
        return request({
            url: '/api/services/app/InvesTemplet/ShowScoreItemForPerson',
            method: 'get',
            params: query
        })
    },

    /**
     *供方考察-【资质评估】待办页面打开后界面展示内容
     */
    ShowZzItemForPerson: (query) => {
        return request({
            url: '/api/services/app/InvesTemplet/ShowZzItemForPerson',
            method: 'get',
            params: query
        })
    },

    /**
     *保存考察打分/资质评估结果
     */
    SavePersonScoreAndZzScore: (query) => {
        return request({
            url: '/api/services/app/InvesScoreResult/SavePersonScoreAndZzScore',
            method: 'post',
            data: query
        })
    },

    /**
     *获取编辑考察报告的供应商列表【不分页】
     */
    GetInvesReportEditSupplierList: (query) => {
      return request({
        url: '/api/services/app/InvesSupplier/GetInvesReportEditSupplierList',
        method: 'get',
        params: query
      })
    },

  /**
   *获取编辑考察报告的供应商列表【不分页】
   */
  GetReportMainForEdit: (query) => {
    return request({
      url: '/api/services/app/InvesReport/GetReportMainForEdit',
      method: 'get',
      params: query
    })
  },

    /**
     *获取主题记录
     */
    GetOneInvesMasterById: (query) => {
        return request({
            url: '/api/services/app/InvesMaster/GetOneInvesMasterById',
            method: 'get',
            params: query
        })
    },

    /**
     *获取供应商业绩列表【不分页】
     */
    GetInvesCateInfoList: (query) => {
        return request({
            url: '/api/services/app/InvesCaseInfo/GetInvesCateInfoList',
            method: 'get',
            params: query
        })
    },

    /**
     *新增或修改供应商业绩
     */
    SaveInvesCaseInfo: (query) => {
        return request({
            url: '/api/services/app/InvesCaseInfo/SaveInvesCaseInfo',
            method: 'post',
            data: query
        })
    },

    /**
     *删除供应商业绩
     */
    DeleteInvesCaseInfoById: (query) => {
        return request({
            url: '/api/services/app/InvesCaseInfo/DeleteInvesCaseInfoById',
            method: 'post',
            data: query
        })
    },

    //获取供应商的考察照片列表【不分页】
    GetInvesAttachList: (query) => {
        return request({
            url: '/api/services/app/InvesAttach/GetInvesAttachList',
            method: 'get',
            params: query
        })
    },


    /**
     *根据Id删除考察照片
     */
    DeleteInvesImage: (query) => {
        return request({
            url: '/api/services/app/InvesAttach/DeleteInvesImage',
            method: 'post',
            data: query
        })
    },

    /**
     *上传照片
     */
    InvesFile1: (query) => {
        return request({
            url: '/api/FileUpload/InvesFile1',
            method: 'post',
            data: query,
            headers: {'Content-Type': 'multipart/form-data'}
        })
    },

  InvesImageUpload: (query) => {
    return request({
      url: 'api/FileUpload/InvesImageUpload',
      method: 'post',
      data: query,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },

  InvesReportUpload: (query) => {
    return request({
      url: '/api/FileUpload/InvesReportUpload',
      method: 'post',
      data: query,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },

  InvesBdAttachUpload: (query) => {
    return request({
      url: '/api/FileUpload/InvesBdAttachUpload',
      method: 'post',
      data: query,
      headers: {'Content-Type': 'multipart/form-data'}
    })
  },


    /**
     *保存考察报告模块内容【动态表单】
     */
    SaveModuleForm: (query) => {
        return request({
            url: '/api/services/app/InvesCate/SaveModuleForm',
            method: 'post',
            data: query
        })
    },

    //获取供应商资质评估结果【不分页】
    GetSupplierZzResult: (query) => {
        return request({
            url: '/api/services/app/InvesScoreResult/GetSupplierZzResult',
            method: 'get',
            params: query
        })
    },

    //获取供应商资质评估结果【不分页】
    GetSupplierScoreResult: (query) => {
        return request({
            url: '/api/services/app/InvesScoreResult/GetSupplierScoreResult',
            method: 'get',
            params: query
        })
    },

    //获取供应商资质评估结果【不分页】
    GetPersonScoreStat: (query) => {
        return request({
            url: '/api/services/app/InvesScoreResult/GetPersonScoreStat',
            method: 'get',
            params: query
        })
    },

    GetInvesPersonProcess: (query) => {
        return request({
            url: '/api/services/app/InvesPerson/GetInvesPersonProcess',
            method: 'get',
            params: query
        })
    },

    UrgePerson: (query) => {
        return request({
            url: '/api/services/app/InvesPerson/UrgePerson',
            method: 'post',
            data: query
        })
    },

    GetPersonSupplierResult: (query) => {
        return request({
            url: '/api/services/app/InvesScoreResult/GetPersonSupplierResult',
            method: 'get',
            params: query
        })
    },

    SaveSupplierResult: (query) => {
        return request({
            url: '/api/services/app/InvesSupplier/SaveSupplierResult',
            method: 'post',
            data: query
        })
    },

    SupplierStockInList: (query) => {
        return request({
            url: '/api/services/app/SupBaseInfo/SupplierStockInList',
            method: 'get',
            params: query
        })
    },

    CreateInvesMaster: (query) => {
        return request({
            url: '/api/services/app/InvesLianDoMaster/CreateInvesMaster',
            method: 'post',
            data: query
        })
    },

  GetSupplierCertificateTree: (query) => {
    return request({
      url: '/api/services/app/SupplierTree/GetSupplierCertificateTree',
      method: 'get',
      params: query
    })
  },

  GetSupplierCertificate: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoMaster/GetSupplierCertificate',
      method: 'get',
      params: query
    })
  },

  GetLianDoInvesMasterProjectType: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoMaster/GetLianDoInvesMasterProjectType',
      method: 'get',
      params: query
    })
  },

  GetLianDoInvesDropDown: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoMaster/GetLianDoInvesDropDown',
      method: 'get',
      params: query
    })
  },

  GetLianDoInvesSupplierById: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoMaster/GetLianDoInvesSupplierById',
      method: 'get',
      params: query
    })
  },

  SaveLianDoInvesMaster: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoMaster/SaveLianDoInvesMaster',
      method: 'post',
      data: query
    })
  },

  GetInvesContactList: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoMaster/GetInvesContactList',
      method: 'get',
      params: query
    })
  },
  SaveInvesContactInfo: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoMaster/SaveInvesContactInfo',
      method: 'post',
      data: query
    })
  },

  GetInvesImageList: (query) => {
    return request({
      url: '/api/services/app/InvesAttach/GetInvesImageList',
      method: 'get',
      params: query
    })
  },

  GetInvesReportList: (query) => {
  return request({
    url: '/api/services/app/InvesAttach/GetInvesReportList',
    method: 'get',
    params: query
  })
  },

  DeleteInvesReport: (query) => {
      return request({
        url: '/api/services/app/InvesAttach/DeleteInvesReport',
        method: 'post',
        data: query
      })
    },

  SaveInvesManager: (query) => {
    return request({
      url: '/api/services/app/InvesManager/SaveInvesManager',
      method: 'post',
      data: query
    })
  },

  GetInvesManagerByMasterId: (query) => {
    return request({
      url: '/api/services/app/InvesManager/GetInvesManagerByMasterId',
      method: 'get',
      params: query
    })
  },

  SaveInvesManagerCase: (query) => {
    return request({
      url: '/api/services/app/InvesManagerCase/SaveInvesManagerCase',
      method: 'post',
      data: query
    })
  },

  GetInvesManagerCaseList: (query) => {
    return request({
      url: '/api/services/app/InvesManagerCase/GetInvesManagerCaseList',
      method: 'get',
      params: query
    })
  },

  DeleteInvesManagerCaseById: (query) => {
    return request({
      url: '/api/services/app/InvesManagerCase/DeleteInvesManagerCaseById',
      method: 'post',
      data: query
    })
  },

  DeleteSupContacterById: (query) => {
    return request({
      url: '/api/services/app/SupContacter/DeleteSupContacterById',
      method: 'post',
      data: query
    })
  },

  GetModuleDynamicForm2: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoDynamicForm/GetModuleDynamicForm2',
      method: 'get',
      params: query
    })
  },

  SaveInvesLianDoForm: (query) => {
    return request({
      url: '/api/services/app/InvesLianDoDynamicForm/SaveInvesLianDoForm',
      method: 'post',
      data: query
    })
  },

  GetInvesBdAttach: (query) => {
    return request({
      url: '/api/services/app/InvesAttach/GetInvesBdAttach',
      method: 'get',
      params: query
    })
  },

  DeleteInvesMaster: (query) => {
    return request({
      url: '/api/services/app/InvesMaster/DeleteInvesMaster',
      method: 'post',
      data: query
    })
  },


}