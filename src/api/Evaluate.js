import request from "../util/request";

export default {
  /**
   * 年份下拉
   */
  GetYearList: (query) => {
    return request({
      url: "/api/services/app/EvalMain/GetYearList",
      method: "get",
      params: query,
    });
  },
  /**
   * 评价阶段下拉
   */
  GetBidPersonRole: (query) => {
    return request({
      url: "/api/services/app/EvalMain/GetBidPersonRole",
      method: "get",
      params: query,
    });
  },

  /**
   *考察目的、考察报告，下拉获取
   */
  GetAllDropDown: (query) => {
    return request({
      url: "/api/services/app/InvesMaster/GetAllDropDown",
      method: "get",
      params: query,
    });
  },

  /**
   *获取评价主体分页记录
   */
  GetEvalMainList: (query) => {
    return request({
      url: "/api/services/app/EvalMain/GetEvalMainList",
      method: "get",
      params: query,
    });
  },
  /**
   *新增或修改评价主体
   */
  SaveEvalMain: (query) => {
    return request({
      url: "/api/services/app/EvalMain/InsertOrUpdateEvalMainSingle",
      method: "post",
      data: query,
    });
  },
  /**
   *删除供应商业绩
   */
  DeleteEvalMain: (query) => {
    return request({
      url: "/api/services/app/EvalMain/DeleteEvalMainById",
      method: "post",
      data: query,
    });
  },
  /**
   *修改主体状态
   */
  UpdateIsEnable: (query) => {
    return request({
      url: "/api/services/app/EvalMain/UpdateIsEnable",
      method: "post",
      data: query,
    });
  },
  /**
   *获取合同信息列表
   */
  GetProjectContractList: (query) => {
    return request({
      url: "/api/services/app/Contract/GetProjectContractList",
      method: "get",
      params: query,
    });
  },
  /**
   *启动评价
   */
  StartEvaluate: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/StartEvaluate",
      method: "post",
      data: query,
    });
  },
  /**
   *设置不参评
   */
  NoEvaluate: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/NoEvaluate",
      method: "get",
      params: query,
    });
  },

  /**
   *评审人员信息
   */
  GetTempDepartment: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/GetTempDepartment",
      method: "get",
      params: query,
    });
  },
  /**
   *评审分类下拉获取
   */
  GetBidPersonRole: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/GetBidPersonRole",
      method: "get",
      params: query,
    });
  },
  /**
   *履约模板下拉获取
   */
  GetTempMasterList: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/GetTempMasterList",
      method: "get",
      params: query,
    });
  },
  /**
   *模板预览
   */
  GetTempDetail: (query) => {
    return request({
      url: "/api/services/app/EvaluateTemp/GetTempDetail",
      method: "get",
      params: query,
    });
  },
  /**
   *删除已选评审人
   */
  DelEvalPerson: (query) => {
    return request({
      url: "/api/services/app/PersionGrade/DelEvalPerson",
      method: "post",
      data: query,
    });
  },
  /**
   *提交评价信息
   */
  SubmitEvaluate: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/SubmitEvaluate",
      method: "post",
      data: query,
    });
  },
  /**
   *查询部门已选人员
   */
  GetEvalPersion: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/GetEvalPersion",
      method: "get",
      params: query,
    });
  },
  /**
   *提交选择人员
   */
  InsertEvalPersion: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/InsertEvalPersion",
      method: "post",
      data: query,
    });
  },
  /**
   *我发起的评价列表
   */
  GetContractEvaluateList: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/GetContractEvaluateList",
      method: "get",
      params: query,
    });
  },
  /**
   *删除评价
   */
  DelEvaluate: (query) => {
    return request({
      url: "/api/services/app/StartEvaluate/DelEvaluate",
      method: "post",
      data: query,
    });
  },
  /**
   *评价基本信息
   */
  GetDetailByGroupId: (query) => {
    return request({
      url: "/api/services/app/PersionGrade/GetDetailByGroupId",
      method: "get",
      params: query,
    });
  },
  /**
   *所有评价人员
   */
  GetEvalPersonSorceList: (query) => {
    return request({
      url: "/api/services/app/PersionGrade/GetEvalPersonSorceList",
      method: "get",
      params: query,
    });
  },
  /**
   *重新评审
   */
  AgainEvaluate: (query) => {
    return request({
      url: "/api/services/app/PersionGrade/AgainEvaluate",
      method: "post",
      data: query,
    });
  },
  /**
   *评价预警列表
   */
  GetAlarmEvaluateList: (query) => {
    return request({
      url: "/api/services/app/AlarmEvaluate/GetAlarmEvaluateList",
      method: "get",
      params: query,
    });
  },
  /**
   *供方综合得分
   */
  GetEvaluateList: (query) => {
    return request({
      url: "/api/services/app/EvaluateReport/GetAlarmEvaluateList",
      method: "get",
      params: query,
    });
  },
  /**
   *结果等级下拉
   */
  GetLevel: (query) => {
    return request({
      url: "/api/services/app/EvaluateReport/GetLevel",
      method: "get",
      params: query,
    });
  },
  /**
   *生成综合得分报告
   */
  UpdateCompleted: (query) => {
    return request({
      url: "/api/services/app/EvalMain/UpdateCompleted",
      method: "post",
      data: query,
    });
  },
  /**
   *评分项结果
   */
  GetResScoreByDep: (query) => {
    return request({
      url: "/api/services/app/PersionGrade/GetResScoreByDep",
      method: "get",
      params: query,
    });
  },
  /**
   *打分人员详情
   */
  GetEvaluateGradeDetail: (query) => {
    return request({
      url: "/api/services/app/PersionGrade/GetEvaluateGradeDetail",
      method: "get",
      params: query,
    });
  },
  /**
   *提交分数
   */
  SubmitResult: (query) => {
    return request({
      url: "/api/services/app/PersionGrade/SubmitResult",
      method: "post",
      data: query,
    });
  },
  /**
   *催办评分
   */
  UrgePerson: (query) => {
    return request({
      url: "/api/services/app/PersionGrade/UrgePerson",
      method: "post",
      data: query,
    });
  },
};
