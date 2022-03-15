<template>
  <el-main>
    <!-- <div style="text-align:right">
      <el-button type="primary" size="mini" @click="$router.back(-1)">返回</el-button>
    </div> -->

    <el-row id="page_main">
      <div style="margin-bottom: 40px;">
        <el-button size="mini" style="float: right" @click="$router.back(-1)">返回</el-button>
      </div>
      <div class="four">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>参与资格预审人员信息（甲方）</b></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btn1" style="justify-content: flex-end;background:#fff;">
          <!--          <div>{{ message }}</div>-->
          <el-button type="primary" size="mini" @click="add(4)">新增参与资格预审人员</el-button>
        </div>
        <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="resonList" v-loading="loading">
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <el-table-column label="姓名" min-width="160" align="center" prop="personName"> </el-table-column>
          <el-table-column align="center" label="部门" prop="workAs"> </el-table-column>
          <el-table-column align="center" label="手机" prop="mobile"> </el-table-column>
          <el-table-column label="操作" align="center" width="80" v-if="type == 1">
            <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteRow4(scope.row)"></i>
              <i style="margin-left:10px" class="el-icon-edit" @click="editRow4(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="first">
        <div style="display: flex;justify-content: space-between;float: right;">
          <div v-show="type == 1">
            <b style="font-size:16px;"> 供应商是否可编辑资格预审信息： </b>
            <el-radio-group class="r_group" @change="handleEdit" style="margin-top:8px;font-size:20px;" v-model="base.supCanEdit">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </div>
          <span v-show="type != 1"></span>
        </div>

        <div style="margin-top: 30px">
          <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item><b>1.公司基本信息</b></el-breadcrumb-item>
          </el-breadcrumb>
          <table class="layui-table el-table__body">
            <tbody>
              <tr>
                <td class="right">总公司单位名称：</td>
                <td colspan="7">
                  <span>{{ base.comFullName }}</span>
                  <!-- <span v-if="type == 2 || !base.supCanEdit">{{ base.comFullName }}</span> -->
                  <!-- <el-input v-else v-model="base.comFullName" placeholder="请选择" @focus="selectSupVisible = true"></el-input> -->
                </td>
              </tr>
              <tr>
                <td class="right">
                  成立时间：
                </td>
                <td class="center">
                  {{ base.registDate }}
                </td>
                <td class="right">
                  注册资金：
                </td>
                <td class="center">
                  <span v-if="base.regCapital + base.regCapitalType == NaN"></span>
                  <span v-else>{{ base.regCapital + base.regCapitalType }}</span>
                </td>
                <td class="right">
                  企业性质：
                </td>
                <td class="center">
                  {{ base.companyType }}
                </td>
                <td class="right">
                  资质：
                </td>
                <td class="center tdLine" :title="base.certificates">
                  <div class="diandiandian">{{ base.certificates }}</div>
                </td>
              </tr>
              <tr>
                <td class="right">办公地址：</td>
                <td colspan="7">
                  {{ base.address }}
                  <!-- <el-input v-model="desc" placeholder="请输入定标说明"></el-input> -->
                </td>
              </tr>
              <tr>
                <td class="right">主营范围：</td>
                <td colspan="7">
                  <!--                  {{ base.businessDomain }}-->
                  <span v-if="type == 2 && !base.supCanEdit">{{ base.businessDomain }}</span>
                  <!--                  <div style="color:#409eff">注：如总包、桩基、门窗、幕墙、消防、市政、电力、景观工程等</div>-->
                  <el-input
                    v-if="type == 1"
                    v-model="base.businessDomain"
                    placeholder="如总包、桩基、门窗、幕墙、消防、市政、电力、景观工程等"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td class="right">主营区域：</td>
                <td colspan="7">
                  {{ base.businessAreas }}
                  <!-- <el-input v-model="desc" placeholder="请输入定标说明"></el-input> -->
                </td>
              </tr>
              <tr>
                <td colspan="8">
                  <el-input type="textarea" :rows="2" v-model="base.supplierInfoDesc" placeholder="请输入公司基本介绍"></el-input>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="btns">
            <el-button v-if="type == 1" type="primary" size="mini" @click="save1">暂存信息</el-button>
          </div>
        </div>
      </div>
      <div class="nine">
        <el-form label-position="center" ref="saveSupForm" size="small" class="border p-2 mb-2 mt-2" :model="formSearch" :rules="rules">
          <el-row :gutter="10">
            <el-col :span="24">
              <!-- <span></span> -->
              <el-form-item label="资格预审主题">
                <el-input
                  maxlength="30"
                  show-word-limit
                  placeholder="针对我司哪个城市项目哪个分部分项工程组织进行的资格预审，如**城市**地区**期区/批次**工程(必填)"
                  v-if="type == 1"
                  v-model="formSearch.masterName"
                />
                <span v-else>{{ formSearch.masterName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <!-- <span></span> -->
              <el-form-item label="所属专业" prop="supCateName">
                <el-input
                  placeholder="请选择所属专业(必填)"
                  v-if="type == 1"
                  ref="supCateName"
                  v-model="formSearch.supCateName"
                  @focus="categoryVisible = true"
                />
                <span v-else>{{ formSearch.supCateName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="项目">
                <el-input placeholder="请选择项目" v-if="type == 1" v-model="formSearch.projectName" @focus="subJectAdd" />
                <span v-else>{{ formSearch.projectName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="供应商推荐人" prop="userName">
                <el-input placeholder="请选择供应商推荐人" v-if="type == 1" ref="userName" v-model="formSearch.userName" @focus="onAdd" />
                <span v-else>{{ formSearch.userName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="所属城市" prop="cityName">
                <el-input placeholder="请选择所属城市(必填)" v-if="type == 1" ref="city" v-model="formSearch.cityName" @focus="cityAdd" />
                <span v-else>{{ formSearch.cityName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="资格预审结果">
                <el-select v-model="formSearch.QuaResult">
                  <el-option label="请选择" value=""></el-option>
                  <el-option label="通过" value="通过"></el-option>
                  <el-option label="未通过" value="未通过"></el-option>
                  <!-- <el-option v-for="item in dropDownGroup.invesStatus" :key="item.value" :label="item.text" :value="item.value"></el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="save9">暂存信息</el-button>
        </div>
      </div>
      <div class="four">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>2.人员信息</b></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btn1" v-if="type == 1">
          <div>{{ message }}</div>
          <el-button type="primary" size="mini" @click="add(4)">新增联系人</el-button>
        </div>
        <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="resonList" v-loading="loading">
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <el-table-column label="姓名" min-width="160" align="center" prop="personName"> </el-table-column>
          <el-table-column align="center" label="职务" prop="workAs"> </el-table-column>
          <el-table-column align="center" label="手机" prop="mobile"> </el-table-column>
          <el-table-column align="center" label="座机" prop="phone"> </el-table-column>
          <el-table-column align="center" label="邮箱" prop="email"> </el-table-column>
          <el-table-column label="操作" align="center" width="80" v-if="type == 1">
            <template slot-scope="scope">
              <i class="el-icon-delete" @click="deleteRow4(scope.row)"></i>
              <i style="margin-left:10px" class="el-icon-edit" @click="editRow4(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="three">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>3.基本信息</b></el-breadcrumb-item>
        </el-breadcrumb>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right" colspan="2">对接公司：</td>
              <td colspan="7">
                {{ base.comFullName ? base.comFullName : "暂无" }}
                <!-- <div style="color:#409eff">
                  承接主体：承接我司属地化项目对应的主体公司或实际承包人团队（直营项目经理团队不需要填写）。如为总公司，填写总公司全称；如为分公司或工程公司，填写总公司、及分公司、及工程公司全称，如**建设集团有限公司**区域公司**分公司；如为实际承包人，填写总公司、及分公司、及实际承包人**团队全称，如**建设集团有限公司**区域公司**分公司**团队。
                </div> -->
              </td>
            </tr>
            <tr>
              <td class="right" colspan="2">成立日期：</td>
              <td colspan="7">
                <el-date-picker v-if="type == 1" type="date" v-model="openDate" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
                <span v-else>{{ openDate }}</span>
              </td>
            </tr>
            <tr>
              <td class="right" colspan="2">办公地址：</td>
              <td colspan="7">
                <el-input v-if="type == 1" v-model="form3.workAddress" placeholder="请输入办公地址"></el-input>
                <span v-else>{{ form3.workAddress }}</span>
              </td>
            </tr>
            <tr>
              <td class="right" colspan="2">入我司项目所在地承接项目的时间：</td>
              <td colspan="7">
                <el-date-picker v-if="type == 1" type="date" v-model="takeOnProjectDate" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
                <span v-else>{{ takeOnProjectDate }}</span>
              </td>
            </tr>
            <tr>
              <td class="right" colspan="2">承接主体公司主营范围：</td>
              <td colspan="7">
                <el-input
                  v-if="type == 1"
                  v-model="form3.businessDomain"
                  placeholder="如总包、桩基、门窗、幕墙、消防、市政、电力、景观工程等"
                ></el-input>
                <span v-else>{{ form3.businessDomain }}</span>
              </td>
            </tr>
            <tr>
              <td class="right" colspan="2">承接主体公司主营区域：</td>
              <td colspan="7">
                <el-input v-if="type == 1" v-model="form3.businessArea" placeholder="请输入承接主体公司主营区域"></el-input>
                <span v-else>{{ form3.businessArea }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="9">
                <el-table
                  height="400"
                  empty-text="无符合条件的记录"
                  stripe
                  border
                  ref="multipleTable"
                  element-loading-text="请稍候,数据正在加载中..."
                  :data="typeList"
                  v-loading="loading"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column
                    label="公司现阶段所有涉及的承接模式（重点说明：我司不避讳是否直属承接，现阶段我司所有合作单位中多种承接模式并存，请如实填写）"
                    align="center"
                  >
                    <el-table-column
                      v-if="typeList.length > 1"
                      align="center"
                      type="selection"
                      width="55"
                      label-class-name="DisabledSelection"
                    ></el-table-column>
                    <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
                    <el-table-column width="150" prop="oneLevelName" label="承接模式" align="center"> </el-table-column>
                    <el-table-column width="220" prop="twoLevelName" label="出资主体" align="center"> </el-table-column>
                    <el-table-column label="出资比例" prop="threeLevelName"> </el-table-column>
                    <el-table-column label="该种承接模式年产值占比" prop="threeLevelName">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.ration" placeholder="如果选择了该模式占比必填"></el-input>
                      </template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="save3">暂存信息</el-button>
        </div>
      </div>
      <div class="five">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>4.供应商重要指标</b></el-breadcrumb-item>
        </el-breadcrumb>

        <el-table
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="importantZhiBiao.formList"
          v-loading="loading"
          :show-header="false"
        >
          <el-table-column align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.item.itemTitle }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template slot-scope="scope">
              <div v-if="type == 2">
                <span v-if="scope.row.item.itemType !== '上传'">{{
                  scope.row.item.itemType == "多选" ? scope.row.selectValue : scope.row.textValue
                }}</span>
                <el-button
                  @click="downLoad5(importantZhiBiao.fileUrl)"
                  style="padding:5px 10px"
                  type="primary"
                  v-if="importantZhiBiao.fileId != '00000000-0000-0000-0000-000000000000' && scope.row.item.itemType == '上传'"
                  >下载</el-button
                >
                <span>{{ importantZhiBiao.fileName }}</span>
              </div>
              <div v-else style=";margin-right:10px">
                <el-input
                  class="line"
                  v-model="scope.row.textValue"
                  :placeholder="scope.row.item.defaultValue"
                  v-if="scope.row.item.itemType == '单行文本' || scope.row.item.itemType == '多行文本'"
                ></el-input>
                <el-button @click="upDownFile(1)" style="padding:5px 10px" type="primary" v-if="scope.row.item.itemType == '上传'"
                  >上传</el-button
                >

                <el-radio-group v-if="scope.row.item.itemType == '单选'" v-model="scope.row.textValue">
                  <el-radio v-for="item in scope.row.selectorList" :label="item.selectorId" :key="item.selectorId">{{
                    item.selectorText
                  }}</el-radio>
                </el-radio-group>
                <el-checkbox-group v-model="scope.row.selectValue" v-if="scope.row.item.itemType == '多选'">
                  <el-checkbox v-for="item in scope.row.selectorList" :label="item.selectorId" :key="item.selectorId">
                    {{ item.selectorText }}
                  </el-checkbox>
                </el-checkbox-group>
                <el-select v-if="scope.row.item.itemType == '下拉'" v-model="scope.row.textValue" placeholder="请选择">
                  <el-option
                    v-for="item in scope.row.selectorList"
                    :key="item.selectorText"
                    :label="item.selectorText"
                    :value="item.selectorId"
                  >
                  </el-option>
                </el-select>
                <span v-if="importantZhiBiao.fileId != '00000000-0000-0000-0000-000000000000' && scope.row.item.itemType == '上传'">
                  <el-button @click="downLoad5(importantZhiBiao.fileUrl)" style="padding:5px 10px;margin-left:5px" type="primary"
                    >下载</el-button
                  >
                  <span>{{ importantZhiBiao.fileName }}</span>
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="save5">暂存信息</el-button>
        </div>
      </div>
      <div class="six">
        <!--        <edit5 :type="type" ref="edit5" @fatherFun="GetQuaMessage"></edit5>-->
        <edit5 :type="type" ref="edit5" :url="base.tempFileUrl2"></edit5>
      </div>
      <div class="seven">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>6.实际承包人基本情况（如有）</b></el-breadcrumb-item>
        </el-breadcrumb>
        <el-table
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="resonBase"
          v-loading="loading"
          :show-header="false"
        >
          <el-table-column align="left">
            <template slot-scope="scope">
              <span>{{ scope.row.itemTitle }}</span>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template slot-scope="scope">
              <div v-if="type == 2">
                <span>{{ scope.row.itemType == "多选" ? scope.row.selectValue : scope.row.formValue }}</span>
              </div>
              <div v-else>
                <el-input
                  class="line"
                  v-model="scope.row.formValue"
                  :placeholder="scope.row.defaultValue"
                  show-word-limit
                  :maxlength="scope.row.maxLength"
                  v-if="scope.row.itemType == '单行文本' || scope.row.itemType == '多行文本' || scope.row.itemType == '文本标题'"
                ></el-input>
                <div v-if="scope.row.itemType == '单选'">
                  <el-radio-group v-model="scope.row.formValue">
                    <el-radio v-for="item in scope.row.selectorNameValue" :label="item.selectorName" :key="item.selectorName">{{
                      item.selectorName
                    }}</el-radio>
                  </el-radio-group>
                </div>
                <div v-if="scope.row.itemType == '多选'">
                  <el-checkbox-group v-model="scope.row.selectValue">
                    <el-checkbox v-for="item in scope.row.selectorNameValue" :label="item.selectorName" :key="item.selectorName">
                      {{ item.selectorName }}
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
                <div v-if="scope.row.itemType == '下拉'">
                  <el-select class="select1" v-model="scope.row.formValue" placeholder="请选择">
                    <el-option
                      v-for="item in scope.row.selectorNameValue"
                      :key="item.selectorName"
                      :label="item.selectorName"
                      :value="item.selectorName"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="save7">暂存信息</el-button>
        </div>
        <!-- <bei-jing :type="4"></bei-jing> -->
        <!-- <improtantDynamic  ref="beijing" :type='type' @getBeiJigList='getList' :seNumber='seNumber'></improtantDynamic> -->
      </div>
      <div class="eight">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><b>7.拟派项目经理（现场负责人）基本情况）</b></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="btns">
          <el-button v-if="type == 1" type="primary" size="mini" @click="add(8)">新增</el-button>
        </div>
        <el-table
          empty-text="暂无数据"
          stripe
          border
          element-loading-text="请稍候,数据正在加载中..."
          :data="baseInfoList"
          v-loading="loading"
        >
          <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
          <el-table-column label="姓名" align="center" prop="name"> </el-table-column>
          <el-table-column align="center" label="性别" prop="sex"> </el-table-column>
          <el-table-column align="center" label="年龄" prop="age"> </el-table-column>
          <el-table-column align="center" label="从事建筑行业年限" prop="buildYear"> </el-table-column>
          <el-table-column align="center" label="从事项目经理年限" prop="managerYear"> </el-table-column>
          <el-table-column align="center" label="进入公司年限" prop="joinCompanyYear"> </el-table-column>
          <el-table-column align="center" label="资质等级" prop="level"> </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <i v-if="type == 1" class="el-icon-edit" title="编辑" @click="upLoad(scope.row)"></i>
              <i v-if="type == 1" style="margin:0 10px" class="el-icon-delete" title="删除" @click="deleterow8(scope.row)"></i>
              <i class="el-icon-download" title="下载" @click="downLoad(scope.row.resumeFileUrl)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="newFour" style="margin-top:20px">
        <edit4></edit4>
      </div>
      <div class="ten" style="margin-bottom:20px">
        <el-breadcrumb class="table-top-title" separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            ><b>9.在施项目业绩汇总表（当上述在施项目业绩汇总表填写不完善时用于后补使用，无需重新提交资格预审）</b></el-breadcrumb-item
          >
        </el-breadcrumb>
        <results-collect :type="`总包`"></results-collect>
        <!-- <div class="btns">
        
          <el-button v-if="type == 1" size="mini" type="primary" @click="downLoadMoudle(base.achTempFileUrl)"> 下载模板</el-button>
          <el-button v-if="type == 1" size="mini" type="primary" @click="upDownFile(2)"> 上传文件</el-button>
        </div>
        <table class="layui-table el-table__body">
          <tbody>
            <tr>
              <td class="right">
                文件名称：
              </td>
              <td class="center" colspan="2">
                {{ achFile.fileName ? achFile.fileName : "" }}
              </td>
              <td class="right">
                文件类型：
              </td>
              <td class="center">
                {{ achFile.fileExtName ? achFile.fileExtName : "" }}
              </td>
              <td class="center" style="width:80px" v-if="achFile.fileReName && achFile.fileUrl">
                <i class="el-icon-download" title="下载" @click="downLoad(achFile.fileUrl + achFile.fileReName)"></i>
              </td>
            </tr>
          </tbody>
        </table> -->
      </div>
      <div class="newFour" style="margin-top:20px">
        <edit6 :type="type" :url="base.tempFileUrl3" :url1="base.tempFileUrl4"></edit6>
      </div>
      <div class="btns" style="margin-top:10px">
        <el-button size="small" v-if="type == 1" type="primary" :loading="loading" @click="saveForm">提交资格预审</el-button>
      </div>
    </el-row>
    <el-dialog width="40%" title="上传文件" :visible.sync="dialogVisible">
      <public-upload
        @fatherMethod="upLoadBack"
        :fileType="fileType5"
        :url="getUploadUrl2"
        :condition="condition5"
        :obj="obj"
        :maxValue="100"
      ></public-upload>
    </el-dialog>
    <el-dialog :visible.sync="selectSupVisible" title="选择供应商" width="95%">
      <supplier-list :type="1" @itemClick="onSelectSups" />
    </el-dialog>
    <el-dialog width="80%" :title="text" :visible.sync="dialogVisible4">
      <el-form label-position="right" ref="saveSupForm4" size="small" label-width="120px" :model="formSearch4" :rules="rules4">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="personName">
              <el-input v-model="formSearch4.personName" placeholder="请输入分联系人姓名" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="职务" prop="workAs">
              <el-select v-model="formSearch4.workAs" placeholder="请选择" style="width:100%">
                <el-option label="董事长" value="董事长"></el-option>
                <el-option label="总经理-总公司" value="总经理-总公司"></el-option>
                <el-option label="经营部负责人-总公司" value="经营部负责人-总公司"></el-option>
                <el-option label="项目现场负责人" value="项目现场负责人"></el-option>
                <el-option label="实际承包人（如有）" value="实际承包人"></el-option>
                <el-option label="总经理-分公司" value="总经理-分公司"></el-option>
                <el-option label="经营部负责人——分公司" value="经营部负责人—分公司"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="formSearch4.mobile" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="座机">
              <el-input v-model="formSearch4.phone" placeholder="请输入座机" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱">
              <el-input v-model="formSearch4.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否主要联系人">
              <el-select v-model="formSearch4.isHeadPerson" placeholder="请选择" style="width:100%">
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="float-right">
              <el-button type="primary" :loading="loading" @click="save4">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog width="70%" :title="text" :visible.sync="dialogVisible8">
      <el-form label-position="right" ref="saveSupForm8" size="small" label-width="130px" :model="formSearch8" :rules="rules8">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formSearch8.name" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select v-model="formSearch8.sex" placeholder="请选择">
                <el-option label="男" value="男"> </el-option>
                <el-option label="女" value="女"> </el-option>
              </el-select>
              <!-- <el-input v-model="formSearch8.sex" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄">
              <el-input-number key="1" style="width:100%" v-model="formSearch8.age" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="从事建筑行业年限">
              <el-input-number key="2" style="width:100%" v-model="formSearch8.buildYear" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="从事项目经理年限">
              <el-input-number key="3" style="width:100%" v-model="formSearch8.managerYear" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进入公司年限">
              <el-input-number key="4" style="width:100%" v-model="formSearch8.joinCompanyYear" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="资质等级">
              <el-input maxlength="30" show-word-limit v-model="formSearch8.level" />
              <div style="text-align:left;margin-left:-90px">
                <public-upload-zongbao
                  ref="upload8"
                  class="newUp"
                  :fileType="fileType"
                  :url="getUploadUrl1"
                  :condition="condition"
                  :obj="formSearch8"
                  :maxValue="100"
                  @fatherMethod="GetSupQuaManagerMes"
                ></public-upload-zongbao>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="float-right">
              <el-button type="primary" :loading="loading" @click="save8">保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="categoryVisible">
      <!-- title="选择招标专业" -->
      <category-tree @itemClick="onChangeCategory" />
    </el-dialog>
    <!-- title="选择招标专业" -->
    <lianXiRen :id="baseGuid" ref="lianXiRen" />
    <!-- <el-dialog title="选择所属城市" :visible.sync="categoryVisibleCity"> -->
    <city-tree :cityId="formSearch.cityId" ref="cityTree" @itemClick="cityTree"></city-tree>
    <!-- </el-dialog> -->
    <user-select title="供应商推荐" ref="userSelect" @itemClick="onUserAdd"></user-select>
    <subJectTree title="项目" :level="2" ref="subJectTree" @itemClick="subJectTree"></subJectTree>
  </el-main>
</template>
<script>
import CategoryTree from "@/views/bid/components/CategoryTree";
import UserSelect from "@/views/bid/components/UserSelect";
import cityTree from "@/views/bid/components/cityList";
import subJectTree from "@/views/bid/components/subJectTree";
import lianXiRen from "@/views/bid/components/lianXiRen";
import BeiJing from "@/views/invest/comp/beiJing.vue";
import resultsCollect from "@/views/quality/components/resultsCollect";
export default {
  components: {
    publicUpload: () => import("@/components/publicUpload.vue"),
    publicUploadZongbao: () => import("../components/publicUploadZongbao.vue"),
    edit5: () => import("../components/edit5.vue"),
    edit4: () => import("../components/edit4.vue"),
    edit6: () => import("../components/edit6.vue"),
    SupplierList: () => import("@/components/SupplierList"),

    CategoryTree,
    UserSelect,
    cityTree,
    subJectTree,
    lianXiRen,
    BeiJing,
    resultsCollect,
  },
  data() {
    return {
      openDate: "",
      takeOnProjectDate: "",
      typeMind: [],
      citys: [],
      takeOnType: [],
      id: "",
      type: 0,
      loading: false,
      VisibleLianXiRen: false,
      dialogVisibleCity: false,
      selectSupVisible: false,
      categoryVisible: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible4: false,
      dialogVisible8: false,
      comName: "",
      text: "",
      base: {
        supplierInfoDesc: "",
        businessDomain: "",
      },
      importantZhiBiao: {},
      form3: {
        workAddress: "",
        businessDomain: "",
        businessArea: "",
      },
      fileList: [],
      file: [],
      typeList: [],
      typeList1: [],
      fileType: [".png", ".jpg", ".pdf", ".xls", ".xlsx", ".rar", ".zip", ".doc", ".docx"],
      fileType5: [],
      condition: "",
      condition5: "",
      getUploadUrl1: "/api/SupplierQua/InsterManagerMes",
      getUploadUrl2: "",
      obj: {},
      radio1: "",
      radio2: "",
      radio3: "",
      companyInfoList: [],
      baseInfoList: [],
      resonList: [],
      achFile: {},
      formSearch: {
        masterName: "",
        projectId: "",
        userId: "",
        categoryId: "",
        cityId: [],
        supCateName: "",
        cityName: "",
        userName: "",
        projectName: "",
        QuaResult: "",
      },
      formSearch2: {
        id: "",
        baseGuid: "",
        subCompanyName: "",
        address: "",
        personName: "",
        phone: "",
        mobilePhone: "",
        email: "",
        workAs: "",
      },
      formSearch4: {
        id: "",
        baseGuid: "",
        personName: "",
        phone: "",
        mobile: "",
        email: "",
        workAs: "",
        isHeadPerson: true,
      },
      formSearch8: {
        id: "",
        masterId: this.$route.query.id,
        name: "",
        sex: "",
        age: 1,
        buildYear: 1,
        managerYear: 1,
        joinCompanyYear: 1,
        level: "",
        resumeFileId: "",
      },
      projects: [],
      supCategory: [],
      rules: {},
      rules2: {
        subCompanyName: { required: true, message: "请输入分公司名称", trigger: "blur" },
        address: { required: true, message: "请输入分公司地址", trigger: "blur" },
        personName: { required: true, message: "请输入联系人姓名", trigger: "blur" },
        mobilePhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        workAs: { required: true, message: "请输入职务", trigger: "blur" },
      },
      rules4: {
        personName: { required: true, message: "请输入联系人姓名", trigger: "blur" },
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        workAs: { required: true, message: "请输入职务", trigger: "blur" },
      },
      rules8: {
        name: { required: true, message: "请输入姓名", trigger: "blur" },
      },
      baseGuid: "", //总公司id
      message: "", //提示语
      resonBase: [],
      spanArr1: [],
      spanArr2: [],
    };
  },
  computed: {},
  mounted() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.GetSupDoBaseInfo();

    this.CheckSupContacter();
    this.GetSupQuaManagerMes();
    this.GetQuaMessage();
    this.GetSupContacterList();
    this.GetSupQuaFormList_Index();
    this.GetSupQuaFormList_Persion();
  },
  methods: {
    regFun(name) {
      return [
        { required: true, message: "请输入" + name + "联系人手机号码", trigger: "blur" },
        { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: "手机号格式错误",
          trigger: "blur",
        },
      ];
    },
    handleEdit(val) {
      if (val) {
        this.$refs.lianXiRen.open();
      }
      this.$http.post("/SupQua/OpenSupplierWrite", { id: this.id, SupCanEdit: this.base.supCanEdit }).then(res => {
        if (res.data.success) {
          this.$message.success(res.data.message);
          this.GetQuaMessage();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //承接模式多选
    async GetTakeOnType() {
      let res = await this.$http.get("/SupQua/GetTakeOnType");
      res.data.forEach(e => {
        this.form3.takeOnType.forEach(i => {
          if (e.cateCode == i.takeOnType) {
            e.ration = i.ration;
          }
        });
      });
      this.typeList = res.data;
      // this.spanArr1 = this.spanArr.getSpanArr(this.typeList, "oneLevelName");
      // this.spanArr2 = this.spanArr.getSpanArr(this.typeList, "twoLevelName");
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 页面列表上 表格合并行 -> 第几列(从0开始)
      // 需要合并多个单元格时 依次增加判断条件即可
      if (columnIndex === 2) {
        //       // 二维数组存储的数据 取出
        let _row = this.spanArr1[rowIndex];
        let _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (columnIndex === 3) {
        //       // 二维数组存储的数据 取出
        let _row = this.spanArr2[rowIndex];
        let _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    handleSelectionChange(val) {
      this.takeOnType = val;
    },
    //公司基本信息
    async GetQuaMessage() {
      let res = await this.$http.get("/SupQua/GetQuaMessage", { params: { masterId: this.id } });
      res.data.result.registDate = res.data.result.registDate ? res.data.result.registDate.split("T")[0] : "";
      this.base = res.data.result;
      this.achFile = res.data.result.achFile;
      this.baseGuid = res.data.result.supId;
      let formSearch = this.formSearch;
      formSearch.projectId = this.base.projectId;
      formSearch.projectName = this.base.projectName;
      formSearch.masterName = this.base.masterName;
      formSearch.userId = this.base.userId;
      formSearch.userName = this.base.userName;
      formSearch.QuaResult = this.base.quaResult;
      this.$refs.edit5.getInfo(this.base.projectCount, this.base.buildArea, this.base.cooperateRatio, this.base.typeRatio);
      formSearch.cityId = this.base.cityList.map(item => item.id);
      formSearch.cityName = this.base.cityList.map(item => item.cityName).toString();

      formSearch.supCateName = this.base.categoryName;
      formSearch.categoryId = this.base.categoryId;
    },
    //验证人员信息是否必填项全部已上传--页面进行提示
    async CheckSupContacter() {
      let res = await this.$http.get("/SupQua/CheckSupContacter", { params: { masterId: this.id } });
      this.message = res.data.message;
    },

    //拟派项目经理（现场负责人）基本情况
    async GetSupQuaManagerMes() {
      let res = await this.$http.get("/SupQua/GetSupQuaManagerMes", { params: { masterId: this.id } });
      this.baseInfoList = res.data;
      this.dialogVisible8 = false;
    },
    //获取人员信息列表
    async GetSupContacterList() {
      let res = await this.$http.get("/SupQua/GetSupContacterList", { params: { masterId: this.id } });
      this.resonList = res.data;
      this.dialogVisible2 = false;
    },
    //获取供应商分公司信息
    // GetOneSupSubCompanyById() {
    //   this.$http.get("/SupSubCompany/GetSupSubCompanies", { params: { baseGuid: this.baseGuid, todoId: this.todoId } }).then(res => {
    //     this.companyInfoList = res.data;
    //   });
    // },
    //获供应商重要指标
    GetSupQuaFormList_Index() {
      this.$http.get("/SupQua/GetSupQuaFormList_Index", { params: { masterId: this.id } }).then(res => {
        let type = this.type;
        let formList = res.data.formList;
        formList.push({
          item: {
            itemTitle: "近三年财务报表",
            itemType: "上传",
          },
        });
        if (type == 2) {
          formList.forEach(item => {
            if (item.item.itemType == "单选" || item.item.itemType == "下拉") {
              if (item.selectorList.length > 0 && item.textValue) {
                item.textValue = item.selectorList.find(e => e.selectorId == item.textValue).selectorText;
              }
            } else if (item.item.itemType == "多选") {
              if (item.selectorList) {
                let arr = item.selectorList.filter(e => item.selectValue.indexOf(e.selectorId) > -1);
                item.selectValue = arr.map(s => s.selectorText).toString();
              }
            }
          });
        }
        this.importantZhiBiao = res.data;
      });
    },
    //实际承包人基本情况（如有）信息
    GetSupQuaFormList_Persion() {
      this.$http.get("/InvesLianDoDynamicForm/GetModuleDynamicForm5", { params: { masterId: this.id } }).then(res => {
        // this.$http.get("/SupQua/GetSupQuaFormList_Persion", { params: { masterId: this.id } }).then(res => {
        let type = this.type;
        if (type == 2) {
          res.data.forEach(item => {
            if (item.itemType == "单选" || item.itemType == "下拉") {
              if (item.selectorList.length > 0 && item.textValue) {
                item.textValue = item.selectorList.find(e => e.selectorId == item.textValue).selectorText;
              }
            } else if (item.item.itemType == "多选") {
              if (item.selectorList) {
                let arr = item.selectorList.filter(e => item.selectValue.indexOf(e.selectorId) > -1);
                item.selectValue = arr.map(s => s.selectorText).toString();
              }
            }
          });
        }
        this.resonBase = res.data;
      });
    },
    //获取对接公司信息http://localhost:8080/#/quality/qualitylistEdit?id=b5e8a090-43a4-40de-914d-492f5094bb42
    async GetSupDoBaseInfo() {
      let res = await this.$http.get("/SupQua/GetSupDoBaseInfo", { params: { masterId: this.id } });
      if (res.data) {
        this.form3 = res.data;
        this.openDate = res.data.openDate;
        this.takeOnProjectDate = res.data.takeOnProjectDate;
        await this.GetTakeOnType();
        if (res.data.takeOnType.length > 0) {
          res.data.takeOnType.map(i => i.takeOnType);
          let arr = res.data.takeOnType.map(i => i.takeOnType);
          let arr1 = this.typeList.filter(item => {
            return arr.indexOf(item.cateCode) > -1;
          });
          this.$nextTick(() => {
            arr1.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          });
        }
      }
    },

    onSubmit() {
      this.formSearch.supCategoryIds = this.supCategory.map(v => v.id);
      // this.formSearch.comMainName = this.formSearch.comFullName;
      let that = this;
      this.$refs.saveSupForm.validate(valid => {
        if (valid) {
          this.$confirm("确定要提交信息吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            that.loading = true;
            that.$api.SupBaseInfo.SaveUserRegSupplierInfo(that.formSearch)
              .then(res => {
                this.$message({
                  type: "success",
                  message: res.message,
                });
              })
              .finally(() => {
                that.loading = false;
              });
          });
        } else {
          return false;
        }
      });
    },
    //选择公司
    onSelectSups(sup) {
      this.baseGuid = sup.id;
      let obj = {
        masterId: this.id,
        supId: sup.id,
      };
      this.$http.post("/SupQua/InsterSupQuaMaster", obj).then(res => {
        this.selectSupVisible = false;
        this.GetQuaMessage();
      });
    },
    onAdd() {
      this.$refs.userSelect.open();
    },
    cityAdd() {
      this.$refs.cityTree.open();
    },

    subJectAdd() {
      this.$refs.subJectTree.open();
    },
    onUserAdd(user) {
      this.formSearch.userId = user.userGuid;
      this.$refs.userSelect.close();
      this.formSearch.userName = user.userName;
    },
    cityTree(city) {
      // console.log(city);
      this.formSearch.cityId = city.map(item => item.cityId);
      this.formSearch.cityName = city.map(item => item.cityName).toString();
      this.$refs.cityTree.close();
    },
    subJectTree(sub) {
      this.formSearch.projectId = sub.id;
      this.formSearch.projectName = sub.projectFullName;
      this.$refs.subJectTree.close();
    },
    onChangeCategory(category) {
      this.formSearch.supCateName = category.cateName;
      this.formSearch.categoryId = category.id;
      this.categoryVisible = false;
    },
    save9() {
      let formSearch = this.formSearch;
      if (formSearch.supCateName == "") {
        this.$message.warning("请选择专业！");
      } else if (formSearch.masterName == "") {
        this.$message.warning("请填写资格预审主体名称！");
      } else if (formSearch.cityName == "") {
        this.$message.warning("请选择所属城市！");
      } else {
        let obj = {
          masterId: this.id,
          masterName: formSearch.masterName,
          categoryId: formSearch.categoryId,
          projectId: formSearch.projectId,
          userId: formSearch.userId,
          cityCode: formSearch.cityId,
          quaResult: formSearch.QuaResult,
        };
        this.$http.post("/SupQua/SubmitSupplierQua", obj).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetQuaMessage();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      }
    },
    saveForm() {
      this.$confirm("提交后不能修改,确认要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupQua/SubmitQualityStatus", { id: this.id }).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.$router.back(-1);
          } else {
            this.$msg.error(res.data.message);
          }
        });
      });
    },

    //1、对接公司信息保存
    save1() {
      let obj = {
        masterId: this.id,
        supplierInfoDesc: this.base.supplierInfoDesc,
      };
      if (this.base.supplierInfoDesc) {
        this.$http.post("/SupQua/SaveSupplierInfoDesc", obj).then(res => {
          let data = res.data;
          if (data.success) {
            this.$message.success(data.message);
            this.GetQuaMessage();
          } else {
            this.$message.error(data.message);
          }
        });
      } else {
        this.$message.warning("请输入公司基本介绍");
      }
    },
    editRow2(row) {
      this.formSearch2 = row;
      this.dialogVisible2 = true;
    },
    //3、对接公司信息保存
    save3() {
      this.takeOnType.forEach(item => {
        let arr = this.takeOnType.map(e => {
          return {
            takeOnType: e.cateCode,
            ration: e.ration,
          };
        });
        let obj = {
          masterId: this.id,
          openDate: this.openDate,
          workAddress: this.form3.workAddress,
          takeOnProjectDate: this.takeOnProjectDate,
          businessDomain: this.form3.businessDomain,
          businessArea: this.form3.businessArea,
          takeOnType: arr,
        };
        this.$http.post("/SupQua/InsterSupDoBaseInfo", obj).then(res => {
          let data = res.data;
          if (data.success) {
            this.$message.success(data.message);
            // this.GetTakeOnType();
            // this.GetSupDoBaseInfo();
          } else {
            this.$message.error(data.message);
          }
        });
      });
    },
    //4、人员信息保存
    save4() {
      this.$refs.saveSupForm4.validate(valid => {
        if (valid) {
          this.$http.post("/SupQua/InsterSupContacter", this.formSearch4).then(res => {
            let data = res.data;
            if (data.success) {
              this.$message.success(data.message);
              this.dialogVisible4 = false;
              this.GetSupContacterList();
            } else {
              this.$message.error(data.message);
            }
          });
        }
      });
    },
    editRow4(row) {
      this.formSearch4 = row;
      this.dialogVisible4 = true;
    },
    deleteRow4(row) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupQua/DeleteSupContacterById", { id: row.id }).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetSupContacterList();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      });
    },
    upLoad(row) {
      let formSearch8 = this.formSearch8;
      this.text = "编辑项目经理信息";
      formSearch8.id = row.id;
      formSearch8.name = row.name;
      formSearch8.sex = row.sex;
      formSearch8.age = row.age;
      formSearch8.buildYear = row.buildYear;
      formSearch8.managerYear = row.managerYear;
      formSearch8.joinCompanyYear = row.joinCompanyYear;
      formSearch8.level = row.level;
      formSearch8.resumeFileId = row.resumeFileId;
      formSearch8.resumeFileUrl = row.resumeFileUrl;
      this.dialogVisible8 = true;
    },
    deleterow8(row) {
      this.$confirm("您确认要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/SupQua/DelSupQuaManagerMes", { id: row.id }).then(res => {
          if (res.data.success) {
            this.$msg.success(res.data.message);
            this.GetSupQuaManagerMes();
          } else {
            this.$msg.error(res.data.message);
          }
        });
      });
    },
    add(i) {
      switch (i) {
        case 2:
          this.text = "新增分公司";
          let formSearch2 = this.formSearch2;
          formSearch2.id = "";
          formSearch2.baseGuid = this.baseGuid;
          formSearch2.subCompanyName = "";
          formSearch2.address = "";
          formSearch2.personName = "";
          formSearch2.phone = "";
          formSearch2.mobilePhone = "";
          formSearch2.email = "";
          formSearch2.workAs = "";
          this.dialogVisible2 = true;
          break;
        case 4:
          this.text = "新增人员信息";
          let formSearch4 = this.formSearch4;
          formSearch4.id = "";
          formSearch4.baseGuid = this.baseGuid;
          formSearch4.personName = "";
          formSearch4.phone = "";
          formSearch4.mobile = "";
          formSearch4.email = "";
          formSearch4.workAs = "";
          this.dialogVisible4 = true;
          break;
        case 8:
          this.text = "新增项目经理信息";
          let formSearch8 = this.formSearch8;
          formSearch8.id = "";
          formSearch8.name = "";
          formSearch8.sex = "";
          formSearch8.age = 1;
          formSearch8.buildYear = 1;
          formSearch8.managerYear = 1;
          formSearch8.joinCompanyYear = 1;
          formSearch8.level = "";
          formSearch8.resumeFileId = "";
          formSearch8.resumeFileUrl = "";
          this.dialogVisible8 = true;
          break;
      }
    },

    upDownFile(i) {
      if (i == 1) {
        this.fileType5 = [".png", ".jpg", ".pdf", ".xls", ".xlsx", ".rar", ".doc", ".docx", ".zip"];
        this.condition5 = "允许文件类型：.png|.jpg|.pdf|.xls|.xlsx|.rar|.zip| 格式 最大：50 兆";
        this.getUploadUrl2 = "/api/SupplierQua/Upload_SupQuaFormList_Index";
      } else {
        this.fileType5 = [".xls", ".xlsx"];
        this.condition5 = "允许文件类型：.xls|.xlsx 格式 最大：10 兆。上传时自动删除原有文件";
        this.getUploadUrl2 = "/api/services/app/SupQua/UploadQuaAchievement";
      }
      this.obj = { masterId: this.id };
      this.dialogVisible = true;
    },
    downLoadMoudle(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },
    downLoad5(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },

    upLoadBack(val) {
      // console.log(val.fileReName);
      this.importantZhiBiao.fileId = val.fileId;
      this.importantZhiBiao.fileUrl = val.fileUrl;
      this.GetQuaMessage();
      this.GetSupQuaFormList_Index();
      this.importantZhiBiao.fileName = val.fileName;
      this.dialogVisible = false;
    },
    save5() {
      // if (this.importantZhiBiao.fileId == "00000000-0000-0000-0000-000000000000") {
      //   this.$message.warning("请先上传近三年财务报表");
      // } else {
      let st = this.importantZhiBiao.formList.slice(0, -1);
      let arr = st.map(item => {
        return {
          itemId: item.item.id,
          itemSelectorId:
            item.textValue == "" || item.item.itemType == "单行文本" || item.item.itemType == "多行文本"
              ? ["00000000-0000-0000-0000-000000000000"]
              : item.item.itemType == "多选"
              ? item.selectValue
              : [item.textValue],
          value: item.item.itemType == "单行文本" || item.item.itemType == "多行文本" ? item.textValue : "",
        };
      });
      let obj = {
        valueList: {
          masterId: this.id,
          formValues: arr,
        },
        fileId: this.importantZhiBiao.fileId,
      };
      this.$api.quality.InsterSupQuaFormList_Index(obj).then(res => {
        let data = res;
        if (data.success) {
          this.$message.success(data.message);
          this.GetSupQuaFormList_Index();
        } else {
          this.$message.error(data.message);
        }
      });
      // }
    },
    GetTakeOnType_SelectList() {
      this.$http.get("/SupQua/GetTakeOnType_SelectList").then(res => {
        this.typeList1 = res.data;
      });
    },

    save7() {
      let st = this.resonBase;
      let arr = st.map(item => {
        return {
          itemId: item.itemId,
          id: item.id,
          inputValues: item.itemType == "多选" ? item.selectValue : [item.formValue],
        };
      });
      let obj = {
        masterId: this.id,
        itemValues: arr,
      };
      this.$http.post("/InvesLianDoDynamicForm/SaveInvesLianDoForm", obj).then(res => {
        // this.$http.post("/SupQua/SaveSupQuaFormList_Persion", obj).then(res => {
        let data = res.data;
        if (data.success) {
          this.$message.success(data.message);
          this.GetSupQuaFormList_Persion();
        } else {
          this.$message.error(data.message);
        }
      });
    },
    save8() {
      this.$refs.saveSupForm8.validate(valid => {
        if (valid) {
          this.$refs.upload8.submitUpload();
        }
      });
    },
    downLoad(url) {
      window.location.href = process.env.VUE_APP_API_URL + url;
    },
  },
};
</script>
<style scoped>
#page_main {
  padding-bottom: 90px;
}
.btns {
  margin: 10px 0;
  text-align: right;
}
.btn1 {
  background: #ffe793;
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  padding-left: 10px;
  font-size: 15px;
}
::v-deep.table-top-title {
  padding: 5px;
  margin: 10px 0;
  font-size: 15px;
}
.right {
  padding: 9px 5px;
}
::v-deep .line .el-input__inner {
  border: 0px solid #fff !important;
  border-bottom: 1px solid #ccc !important;
  border-radius: 0% !important;
}
::v-deep .r_group .el-radio__label {
  font-size: 16px;
}
::v-deep .newUp .el-upload__tip {
  display: inline-block;
  margin-left: 10px;
}
.tdLine {
  width: 100%;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
  cursor: pointer;
}
/*表格全选框去除空框*/
.el-table /deep/ .DisabledSelection .cell .el-checkbox__inner {
  display: none;
  position: relative;
}
/*表格全选框改为：选择*/
.el-table /deep/ .DisabledSelection .cell:before {
  content: "请选择";
  position: absolute;
  left: 7px;
}
</style>
