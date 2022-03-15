<template>
  <div class="">
    <el-tabs v-model="activeName" @tab-click="tabsClick">
      <el-tab-pane label="评标配置" name="评标配置">
        <el-form style="z-index: 99999" :model="userForm" :rules="ruleScore" ref="ruleScore" label-width="150px" class="demo-ruleForm">
          <el-row>
            <el-col :span="24">
              <div>
                <el-input
                  v-if="showSavePercentButton"
                  placeholder="请输入比例"
                  type="number"
                  :min="1"
                  v-model="userForm.techPercent"
                  style="width: 300px"
                >
                  <template #prepend>技术得分比例(%)</template>
                </el-input>
                <el-input
                  v-if="!showSavePercentButton"
                  disabled
                  placeholder="请输入比例"
                  type="number"
                  :min="1"
                  v-model="userForm.techPercent"
                  style="width: 300px"
                >
                  <template #prepend>技术得分比例(%)</template>
                </el-input>
                <el-input
                  v-if="showSavePercentButton"
                  placeholder="请输入比例"
                  type="number"
                  :min="1"
                  v-model="userForm.businessPercent"
                  style="width: 300px; margin-left: 10px"
                >
                  <template #prepend>商务得分比例(%)</template>
                </el-input>
                <el-input
                  v-if="!showSavePercentButton"
                  disabled
                  placeholder="请输入比例"
                  type="number"
                  :min="1"
                  v-model="userForm.businessPercent"
                  style="width: 300px; margin-left: 10px"
                >
                  <template #prepend>商务得分比例(%)</template>
                </el-input>
                <el-select
                  v-if="showSavePercentButton"
                  style="width: 200px; margin-left: 10px"
                  v-model="userForm.examMethod"
                  placeholder="评标方法"
                >
                  <el-option label="评标方法" value=""> </el-option>
                  <el-option v-for="item in examMethodList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
                <el-select
                  v-if="!showSavePercentButton"
                  disabled
                  style="width: 200px; margin-left: 10px"
                  v-model="userForm.examMethod"
                  placeholder="评标方法"
                >
                  <el-option label="评标方法" value=""> </el-option>
                  <el-option v-for="item in examMethodList" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
                <el-select
                  v-if="showSavePercentButton"
                  style="width: 200px; margin-left: 10px"
                  v-model="userForm.businessExamType"
                  placeholder="商务得分计算原则"
                >
                  <el-option label="商务得分计算原则" value=""> </el-option>
                  <el-option v-for="item in businessExamTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
                <el-select
                  v-if="!showSavePercentButton"
                  disabled
                  style="width: 200px; margin-left: 10px"
                  v-model="userForm.businessExamType"
                  placeholder="商务得分计算原则"
                >
                  <el-option label="商务得分计算原则" value=""> </el-option>
                  <el-option v-for="item in businessExamTypes" :key="item.value" :label="item.text" :value="item.value"> </el-option>
                </el-select>
                <el-button
                  v-if="showSavePercentButton"
                  type="primary"
                  style="margin-left: 10px; float: right"
                  size="small"
                  @click="submitForm"
                  >保存</el-button
                >
              </div>
              <!-- <el-form-item prop="techPercent" label="技术得分比例(%)">
                <el-input type="number" :min="1" v-model="userForm.techPercent"></el-input>
              </el-form-item> -->
            </el-col>
            <!-- <el-col :span="8">
              <el-form-item prop="businessPercent" label="商务得分比例(%)">
                <el-input type="number" :min="1" v-model="userForm.businessPercent"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item style="text-align:right">
                <el-button v-if="showSavePercentButton" type="primary" size="small" @click="submitForm">保 存</el-button>
              </el-form-item>
            </el-col> -->
          </el-row>
        </el-form>
        <div class="" style="margin-bottom: 100px">
          <el-row>
            <el-col :span="12">
              <!-- <el-tabs v-model="activeName1" @tab-click="handleClick" type="card">
                <el-tab-pane label="技术评标模板" name="技术评标模板"></el-tab-pane>
                <el-tab-pane label="商务评标模板" name="商务评标模板"></el-tab-pane>
              </el-tabs> -->
              <!-- <el-radio-group v-model="activeName1" @change="radioChange">
                <el-radio-button v-for="item in radioList" :label="item.label" :key="item.label">
                  {{ item.tempMasterType }}
                </el-radio-button>
              </el-radio-group> -->
            </el-col>
            <el-col :span="24" class="btns" style="margin-bottom: 10px">
              <span style="color: red; float: left">只需配置技术标评标模板</span>
              <el-button type="primary" style="float: right" size="small" v-if="showSavePercentButton" @click="addzhibiao"
                >新增指标</el-button
              >
              <el-button type="primary" style="float: right; margin-right: 10px" v-if="showSavePercentButton" size="small" @click="lead"
                >导入模板</el-button
              >
            </el-col>
          </el-row>
          <!-- <div class="right"> -->
          <el-table
            empty-text="暂无数据"
            stripe
            border
            element-loading-text="请稍候,数据正在加载中..."
            :data="tempItemList"
            v-loading="loading"
          >
            <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
            <el-table-column prop="wdName" width="150" label="维度" align="center"> </el-table-column>
            <el-table-column prop="zbName" width="150" label="指标" align="center"> </el-table-column>
            <el-table-column prop="itemDesc" label="打分标准" align="left">
              <template slot-scope="scope">
                <span :title="scope.row.itemDesc">{{ scope.row.itemDesc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fullScore" label="满分" align="center" width="100"> </el-table-column>
            <el-table-column label="操作" width="80" align="center" v-if="showSavePercentButton">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="edittptable(scope.row)" style="margin-right: 5px" title="编辑"></i>
                <i class="el-icon-delete" @click="deletetptable(scope.row)" title="删除"></i>
              </template>
            </el-table-column>
          </el-table>
          <div slot="tip" class="score">满分： {{ fullScore }}分</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="招标文件" name="招标文件">
        <el-alert :title="auditmessage3" v-if="showmes3" type="warning" :closable="false"></el-alert>
        <div>
          <p style="float: left; color: red">注：单文件最大500M</p>
          <el-button style="float: right" type="danger" v-if="showSubmitButtonfile" size="mini" @click="subshen">提交审批</el-button>
          <el-card class="box-card" style="margin-top: 30px">
            <div slot="header" class="clearfix flexs">
              <span>招标文件</span>
              <el-button style="float: right" type="danger" v-if="showSubmitButton" size="mini" @click="upLoad4(1)">上传招标文件</el-button>
            </div>
            <div class="tits"></div>
            <el-table
              style="width: 100%; margin-top: 10px"
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="optionList"
              v-loading="loading"
            >
              <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
              <el-table-column label="文件名称" align="left">
                <template slot-scope="scope">
                  <i class="el-icon-star-on" v-if="scope.row.mustUpload" style="color: red; font-size: 8px"></i>
                  <span>{{ scope.row.fileName }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="文件分类" align="center" width="150">
              <template slot-scope="scope"
                ><span>{{ scope.row.fileCateName }}</span>
              </template>
            </el-table-column> -->
              <el-table-column label="文件格式" align="center" width="150">
                <template slot-scope="scope"
                  ><span>{{ scope.row.fileExtName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="todoBusinessCate" label="文件大小" align="center" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.showFileSize }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="是否展示给供应商" align="center" width="200">
              <template slot-scope="scope"
                ><span>{{ !scope.row.showToSupplier ? "否" : "是" }}</span>
              </template>
            </el-table-column> -->
              <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                  <span>
                    <i class="el-icon-download" @click="download(scope.row.id)" style="margin-right: 10px" title="下载文件"></i>
                    <i v-if="canDeleteOrEdit" class="el-icon-delete" @click="deletes(scope.row)" title="删除文件"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <el-card class="box-card" style="margin-top: 30px">
            <div slot="header" class="clearfix flexs">
              <span>底稿</span>
              <el-button style="float: right" v-if="showSubmitButton" type="danger" size="mini" @click="upLoad4(2)">上传底稿</el-button>
            </div>
            <div class="tits"></div>
            <el-table
              style="width: 100%; margin-top: 10px"
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="optionList3"
              v-loading="loading"
            >
              <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
              <el-table-column label="文件名称" align="left">
                <template slot-scope="scope">
                  <i class="el-icon-star-on" v-if="scope.row.mustUpload" style="color: red; font-size: 8px"></i>
                  <span>{{ scope.row.fileName }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="文件分类" align="center" width="150">
              <template slot-scope="scope"
                ><span>{{ scope.row.fileCateName }}</span>
              </template>
            </el-table-column> -->
              <el-table-column label="文件格式" align="center" width="150">
                <template slot-scope="scope"
                  ><span>{{ scope.row.fileExtName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="todoBusinessCate" label="文件大小" align="center" width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.showFileSize }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="是否展示给供应商" align="center" width="200">
              <template slot-scope="scope"
                ><span>{{ !scope.row.showToSupplier ? "否" : "是" }}</span>
              </template>
            </el-table-column> -->
              <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                  <span>
                    <i class="el-icon-download" @click="download(scope.row.id)" style="margin-right: 10px" title="下载文件"></i>
                    <i v-if="canDeleteOrEdit" class="el-icon-delete" @click="deletes(scope.row)" title="删除文件"></i>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
          <div style="margin-top: 30px">
            <el-form v-if="showPassButtonfile || showRefuseButtonfile" v-loading="loadingfa">
              <el-form-item label="审批意见：" prop="ideaRemark" style="margin-top: 20px">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 4 }"
                  placeholder="请输入审批意见"
                  v-model="ideaRemark"
                  style="width: 100%"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="mini"
                  v-if="showPassButtonfile"
                  type="primary"
                  style="float: right; margin-top: 10px"
                  @click="omsubmitfile()"
                  >通过</el-button
                >
                <el-button
                  size="mini"
                  v-if="showRefuseButtonfile"
                  type="primary"
                  style="float: right; margin-top: 10px; margin-right: 10px"
                  @click="bohuifile()"
                  >驳回</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div style="margin-top: 50px" v-if="logsfileshow">
            <div slot="header" class="clearfix">
              <span>审批日志({{ statusfile }})</span>
            </div>
            <div class="text item">
              <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="logsfile">
                <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
                <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
                <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
                <el-table-column prop="creationTime" width="180" label="待办时间" align="center">
                  <template slot-scope="scope"
                    ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
                  >
                </el-table-column>
                <el-table-column prop="dealTime" width="180" label="处理时间" align="center">
                  <template slot-scope="scope"
                    ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
                  >
                </el-table-column>
                <el-table-column prop="status" width="80" label="结果" align="center"> </el-table-column>
                <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="提交审批" name="提交审批">
        <div class="tits">
          <el-button type="danger" size="mini" :disabled="!showSubmitButton" @click="SubmitBidFile">提交审批</el-button>
        </div>
      </el-tab-pane> -->
    </el-tabs>
    <el-dialog :visible.sync="dialogVisible" width="60%" title="编辑基本信息">
      <guoChengBaseInfo :info="baseInfo" :selectList="selectList" ref="detail" @onCancle="dialogVisible = false" @onSubmit="onEditSave" />
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible1" width="95%" title="编辑工期及款项">
      <el-form ref="form" :inline="true" label-width="150px" size="small" :model="dateInfo" :rules="rules" class="m-3">
        <el-row>
          <el-col :span="8">
            <el-form-item label="投标有效期（天）" prop="validityDate">
              <el-input
                v-model="dateInfo.validityDate"
                placeholder="请输入投标有效期"
                oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投标保证金（元）" prop="cashDeposit">
              <el-input
                v-model="dateInfo.cashDeposit"
                placeholder="请输入投标保证金"
                :min="0"
                :precision="2"
                :controls="false"
                type="number"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="绝对工期（天）" prop="projectDate">
              <el-input
                v-model="dateInfo.projectDate"
                placeholder="请输入绝对工期"
                oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="履约保函（%）" prop="evaluatePercent">
              <el-input-number
                v-model="dateInfo.evaluatePercent"
                placeholder="请输入履约保函"
                :min="0"
                :max="100"
                @input.native="onInput0_100"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="质保期（月）" prop="qualityMonth">
              <el-input
                v-model="dateInfo.qualityMonth"
                placeholder="请输入质保期"
                oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方式 " prop="payType">
              <el-select v-model="dateInfo.payType" style="width: 185px" placeholder="请选择付款方式">
                <el-option label="对公转账" value="对公转账"></el-option>
                <el-option label="非现金" value="非现金"></el-option>
                <el-option label="其他" value=""></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="right" style="margin-bottom: 20px">
            <el-button type="primary" size="small" :loading="loadingSave" @click="onSubmit1">保存信息</el-button>
            <el-button size="small" @click="onCancle">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog width="40%" title="上传常用附件样式" :visible.sync="dialogVisible3">
      <el-form class="mt-0" size="small" style="padding: 20px">
        <el-form-item v-if="optionList2.length > 0">
          <el-select v-model="optionValue" placeholder="请选择文件类型" @change="upLoadeChange">
            <el-option v-for="i in optionList2" :key="i.fileName" :label="i.fileName" :value="i.fileName"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="isShowInput" style="width: 200px">
          <el-input v-model="otherValue" placeholder="请输入文件类型" />
        </el-form-item>
        <el-form-item>
          <el-radio v-model="radio" :label="true">展示给供应商</el-radio>
          <el-radio v-model="radio" :label="false">不展示给供应商</el-radio>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload1"
            :data="uploadData"
            :before-upload="beforeUpload1"
            :on-change="handleChange"
            :fileList="fileList"
            :action="getUploadUrl1()"
            :on-success="onUploadSuccess"
            :multiple="false"
            :auto-upload="false"
            :headers="header"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload()">上传</el-button>
            <div slot="tip" class="el-upload__tip">
              允许文件类型：{{ getOneFileTemp.fileExtName }} 最大：{{ getOneFileTemp.maxFileSize }} 兆
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="40%" title="上传招标文件" :visible.sync="dialogVisible4">
      <el-form class="mt-0" size="small" style="padding: 20px" element-loading-text="上传中请稍等···" v-loading="loadingzhaobiao">
        <el-form-item label="文件名称：">
          <el-input v-model="uploadData2.FileName" style="width: 400px" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item v-if="type1 == '1'">
          <el-radio v-model="radio" :label="true">展示给供应商</el-radio>
          <el-radio v-model="radio" :label="false">不展示给供应商</el-radio>
        </el-form-item>

        <!-- <el-form-item>
          <el-select v-model="value" placeholder="请选择文件类型">
            <el-option label="设计类" value="设计类"></el-option>
            <el-option label="工程类" value="工程类"></el-option>
            <el-option label="底稿" value="底稿"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload2"
            :data="uploadData2"
            :before-upload="beforeUpload3"
            :on-change="handleChange2"
            :fileList="fileList"
            :action="getUploadUrl2()"
            :on-success="onUploadSuccess"
            :multiple="false"
            :auto-upload="false"
            :headers="header"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload1">上传</el-button>
            <div slot="tip" class="el-upload__tip">允许文件类型：.doc|.docx|.xls|.xlsx|.rar|.zip|.pdf, 单文件最大：500 兆</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="40%" title="导入模板" :visible.sync="dialogVisible6">
      <el-tabs type="card" v-model="activeNameshow">
        <el-tab-pane label="从已有模板导入" name="first">
          <el-select v-model="mobanvalue" style="margin: 20px">
            <el-option v-for="item in mobanvalues" :key="item.value" :label="item.text" :value="item.value"> </el-option>
          </el-select>
          <el-button type="primary" size="small" style="margin-left: 10px" @click="daoru">导入</el-button>
        </el-tab-pane>
        <el-tab-pane label="从Excel导入" name="second">
          <el-form
            ref="moudle6"
            class="mt-0"
            size="small"
            style="padding: 20px"
            element-loading-text="上传中请稍等···"
            v-loading="loadingmoban"
          >
            <el-form-item label="选择文件">
              <el-upload
                class="upload-demo"
                ref="upload3"
                :data="uploadData"
                :before-upload="beforeUpload2"
                :on-change="handleChange"
                :fileList="fileList"
                :action="getUploadUrl4()"
                :on-success="onUploadSuccess4"
                :multiple="false"
                :auto-upload="false"
                :headers="header"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload2">上传</el-button>
                <el-button type="primary" size="small" v-if="showSavePercentButton" @click="downld">下载模板</el-button>
                <div slot="tip" class="el-upload__tip">允许文件类型：.xls,.xlsx 最大：20 兆</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!--       
        <div style="margin-top:10px;margin-bottom:10px">从Excel导入</div>
        
        <div style="margin-top:10px;margin-bottom:10px">从已有模板导入</div> -->
    </el-dialog>
    <el-dialog width="60%" :title="titlezhibiao" :visible.sync="dialogVisible7">
      <el-form ref="editeva" label-width="80px" size="small" :model="editeva" class="m-3">
        <el-row>
          <el-col :span="10" :offset="1">
            <el-form-item label="维度" prop="masterName">
              <el-input v-model="editeva.wdName" placeholder="请输入维度"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="指标" prop="percent">
              <el-input v-model="editeva.zbName" placeholder="请输入指标"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21" :offset="1">
            <el-form-item label="打分标准" prop="percent">
              <el-input v-model="editeva.itemDesc" type="textarea" placeholder="请输入打分标准"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="满分" prop="percent">
              <el-input v-model="editeva.fullScore" placeholder="请输入满分" type="number" @input.native="onInput0_100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="排序" prop="showOrder">
              <el-input
                v-model="editeva.showOrder"
                placeholder="请输入排序"
                type="number"
                :min="1"
                oninput="if(this.value=='00'){this.value='0';}else{this.value=this.value.replace(/[^0-9]/g,'')}"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="right" style="margin-bottom: 20px">
            <el-button type="primary" size="small" @click="submiteva('editeva')">保存</el-button>
            <el-button size="small" @click="dialogVisible7 = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog width="60%" title="填写退回意见" :visible.sync="dialogVisiblesecc">
      <el-form label-width="80px" size="small" class="m-3">
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="退回原因" prop="masterName">
              <el-input v-model="message" type="textarea" placeholder="请输入退回原因"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="right" style="margin-bottom: 20px">
            <el-button type="primary" size="small" @click="submiteva1(index)">保存</el-button>
            <el-button size="small" @click="dialogVisiblesecc = false">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <el-dialog width="40%" title="上传答疑文件" :visible.sync="dialogVisibleDaYiFile">
      <el-form
        label-width="100px"
        :model="fileDaYiForm"
        ref="fileDaYiForm"
        class="mt-0"
        size="small"
        style="padding: 20px"
        :rules="rulseDaYiFile"
        element-loading-text="上传中请稍等···"
        v-loading="loadingdayi"
      >
        <el-form-item prop="userId" label="选择人员">
          <el-select v-model="fileDaYiForm.userId" multiple placeholder="请选择人员" style="width: 100%">
            <el-option v-for="i in userList" :key="i.userId" :label="i.userName" :value="i.userId"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="content">
          <el-input v-model="fileDaYiForm.content" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="意见" prop="remark">
          <el-input type="textarea" v-model="fileDaYiForm.remark" placeholder="请输入意见" />
        </el-form-item>
        <el-form-item label="选择文件" prop="file">
          <el-upload
            class="upload-demo"
            ref="uploadDaYiFile"
            name="File"
            :data="uploadDataDaYiFile"
            :on-change="handleChange1"
            :fileList="fileList"
            action=""
            :on-success="onUploadSuccessDaYiFile"
            :multiple="false"
            :auto-upload="false"
            :headers="header"
            :http-request="httpRequest"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px" size="small" type="success" @click="choseFile">上传</el-button>
            <span style="margin-left: 20px; color: red">可选择多个文件</span>
            <!-- <div slot="tip" class="el-upload__tip">允许文件类型：{{ getOneFileTemp.fileExtName }} 最大：20 兆</div> -->
            <div slot="tip" class="el-upload__tip">允许文件类型：Excel文件、Office文件、压缩文件，最大50兆</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog width="40%" title="上传附件" :visible.sync="dialogVisiblegong">
      <el-form class="mt-0" size="small" label-width="120px" element-loading-text="上传中请稍等···" v-loading="loadingfile">
        <el-form-item label="文件名称">
          <el-input v-model="FileName" placeholder="请输入文件名称"></el-input>
        </el-form-item>
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="upload"
            :multiple="false"
            :data="uploadData"
            :fileList="fileList"
            :action="getUploadUrlgong()"
            :on-change="beforeUploadgong"
            :on-success="onUploadSuccessgong"
            :auto-upload="false"
            :headers="header"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px" size="small" type="success" @click="submitUploadgong">上传</el-button>
            <div slot="tip" class="el-upload__tip">文件格式：.xlsx|.xls|.doc|.docx|.pdf|压缩包| 最大：200 兆</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </el-dialog>
    <chose-user ref="choseUser" @itemClick="onUserAdd" :type="1" />
    <!-- <el-dialog width="40%" title="上传文件" :visible.sync="dialogVisible12">
      <public-upload
        @fatherMethod="GetOpenPageNavigate"
        :fileType="fileType"
        :url="getUploadUrl1"
        :condition="condition"
        :obj="obj"
        :maxValue="10"
      ></public-upload>
    </el-dialog> -->
  </div>
</template>

<script>
import guoChengBaseInfo from "../components/guoChengBaseInfo";
import { parseTime } from "@/util";
import { BidFileDownLoad004 } from "@/api/down";
import choseUser from "@/components/choseUser";
import bidModeVue from "../bidMode.vue";
export default {
  components: { guoChengBaseInfo, choseUser, publicUpload: () => import("@/components/publicUpload.vue") },
  props: ["id"],
  data() {
    return {
      examMethodList: [],
      businessExamTypes: [],
      value: "",
      remark: "",
      activeNamesneibu: [],
      type1: 0,
      sengdai: false,
      isBidbutton: true,
      dialogVisible12: false,
      showSavePercentButton: false,
      header: { Authorization: "Bearer " + this.$store.state.token },
      bianbut: false,
      msg: "请先设置设计及工程相关人员！",
      fileDaYiForm: {
        userId: "",
        content: "",
        remark: "",
        file: [],
      },
      file: [],
      activeNameshow: "first",
      canDeleteOrEdit: false,
      dialogVisibleDaYiFile: false,
      dialogVisiblegong: false,
      userList: [0],
      rulseDaYiFile: {
        userId: [{ required: true, message: "请选择模板类型", trigger: "change" }],
        content: [{ required: true, message: "请输入标题", trigger: "blur" }],
        remark: [{ required: true, message: "请输入审批意见", trigger: "blur" }],
        file: [{ required: true, message: "文件不能为空", trigger: "change" }],
      },
      uploadDataDaYiFile: {},
      rules: {
        tempMasterType: [{ required: true, message: "请选择模板类型", trigger: "blur" }],
        masterName: [{ required: true, message: "请输入模板名称", trigger: "blur" }],
        percent: [{ required: true, message: "请输入占比", trigger: "blur" }],
      },
      userForm: {
        techPercent: "",
        businessPercent: "",
        examMethod: "",
        businessExamType: "",
      },
      ruleScore: {
        techPercent: [{ required: true, message: "请输入技术得分占比", trigger: "blur" }],
        businessPercent: [{ required: true, message: "请输入商务得分占比", trigger: "blur" }],
      },
      showmes2: false,
      showmes1: false,
      showmes3: false,
      auditmessage1: "",
      auditmessage2: "",
      auditmessage3: "",
      uploadDate: "",
      message: "",
      returnMessage: "",
      returnTime: "",
      creationTime: "",
      showindex: "",
      showdataList: [],
      returnButton: false,
      daYiFileList: [],
      activeName: "评标配置",
      activeName2: "设计文件审批",
      baseInfo: {},
      uploadData2: {
        FileName: "",
      },
      FileName: "",
      fileList: [],
      showRefuseButtongong: false,
      showPassButtongong: false,
      showmarkgong: false,
      mubandata: [],
      uploadData: {},
      optionObj: {}, //上传附件下拉选中的某一项
      bidAttachList: [],
      mobanvalue: "",
      toUserName: "",
      mobanvalues: [],
      businessTempAttach: "",
      businessTempPath: "",
      dateInfo: [
        {
          validityDate: "",
          cashDeposit: "",
          projectDate: "",
          evaluatePercent: "",
          qualityMonth: "",
          payType: "",
        },
      ],
      linkUrl: "",
      tableif: false,
      tableif2: false,
      tableshenpi: [],
      tableshenpi2: [],
      optionList: [],
      optionList2: [],
      optionList3: [],
      selectList: [],
      optionList1: [
        {
          fileName: "",
          id: "",
        },
      ],
      loadingmoban: false,
      loadingzhaobiao: false,
      replaceButton: false,
      submitButton: false,
      uploadButton: false,
      loadinggong: false,
      rizhititle: "",
      status2: "",
      showbutton: true,
      titlezhibiao: "",
      optionValue: "",
      otherValue: "",
      isShowInput: false,
      loading: false,
      loading1: "",
      loading2: "",
      dayiloading: false,
      getOneFileTemp: {},
      techTempAttach: "",
      radio: true,
      loadingfile: false,
      fileName: "",
      selectExplainId: "",
      selectExplainIdtwo: "",
      gongpressButton: false,
      showSubmitButton: false,
      pressButton: true,
      loadingdayi: false,
      showUploadButton: false,
      loadingSave: false,
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      dialogVisible6: false,
      dialogVisible7: false,
      showdayibutton: false,
      dialogVisiblesecc: false,
      isBidUser: false,
      statuscui: "",
      fullScore: "",
      shendata: {},
      designCodeList: [],
      index: 2,
      file: [],
      // },
      fildata: [],
      gongchenglist: [],
      gongchengloading: false,
      tempItemList: [
        {
          wdName: "",
          zbName: "",
          itemDesc: "",
          fullScore: "",
          id: "",
          bidModeId: "",
        },
      ],
      dataList3: [],
      tempItemList2: [
        {
          fileName: "招标文件1",
          buMen: "设计部",
          status: "完成",
          shenHeRen: "张根",
        },
        {
          fileName: "招标文件2",
          buMen: "工程部",
          status: "完成",
          shenHeRen: "张旭颖",
        },
      ],
      editeva: {
        wdName: "",
        zbName: "",
        itemDesc: "",
        fullScore: "",
        id: "",
        tempMasterId: "",
        bidModeId: "",
        showOrder: "",
      },
      rulesrizhi: {
        // remark: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
      },
      loadingfa: false,
      showSubmitButtonfile: false,
      logsfile: [],
      logsfileshow: false,
      statusfile: "",
      showPassButtonfile: false,
      showRefuseButtonfile: false,
      ideaRemark: "",
      engineeringFileAuditButton: false,
      insideQusAuditButton: false,
      activeName1: "评标配置",
      tempMasterId: "",
      radioList: [
        { label: "技术评标模板", tempMasterType: "技术评标模板" },
        // { label: "商务评标模板", tempMasterType: "商务评标模板" },
      ],
    };
  },
  computed: {
    // bidModeId() {
    //   return this.$route.query.id;
    // },
  },
  mounted() {
    this.CheckUserProcessPageAuth();
  },
  methods: {
    parseTime,
    // 子组件
    tomethgozhaobiao() {
      this.CheckUserProcessPageAuth();
    },
    //内部答疑
    httpRequest(param) {
      this.file.push(param.file); // 一般情况下是在这里创建FormData对象，但我们需要上传多个文件，为避免发送多次请求，因此在这里只进行文件的获取，param可以拿到文件上传的所有信息
      this.fileDaYiForm.file = this.file;
    },
    submitForm() {
      this.$refs.ruleScore.validate((valid) => {
        if (valid) {
          let obj = {
            bidModeId: this.id,
            ...this.userForm,
          };
          this.$http.post("/LiandoBidMaster/SaveTechBusinessPercent", obj).then((res) => {
            if (!res.data.success) {
              return this.$msg.error(res.data.message);
            } else {
              this.$msg.success(res.data.message);
            }
          });
        }
      });
    },
    // 进入页面后的判断
    CheckUserProcessPageAuth() {
      this.$http.get("/BidCheckCenter/CheckUserProcessPageAuth", { params: { baseId: this.id } }).then((res) => {
        if (res.data.success) {
          if (!res.data.returnValue1) {
            this.GetBidMasterPageShow();
            this.GetQuestionUserList();
            this.GetTempItemList();
            // this.GetbidFileRole();
            this.GetNewLogList_EngineeringFile();
            this.GetBidMasterFilePageShow();

            this.GetBidFilePageDropDown2001();
            this.GetExistTempNameList41();
            this.GetProgrammeFileList01();
            this.GetProjectTempFile();
            this.AuditMessageLabel1();
            this.AuditMessageLabel2();
            this.AuditMessageLabel3();
          } else {
            this.$router.push({
              path: res.data.returnValue1,
            });
          }
        } else {
          this.$router.push({
            path: "/bid/notice/",
          });
        }
      });
    },
    //时间方法
    timeFormatSeconds(time) {
      var d = time ? new Date(time) : new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      var hours = d.getHours();
      var min = d.getMinutes();
      var seconds = d.getSeconds();

      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      if (hours < 0) hours = "0" + hours;
      if (min < 10) min = "0" + min;
      if (seconds < 10) seconds = "0" + seconds;

      return year + "-" + month + "-" + day + " " + hours + ":" + min + ":" + seconds;
    },
    //退回
    goback(index) {
      this.dialogVisiblesecc = true;
      this.message = "";
      this.index = index;
    },
    //判断提示是否出现
    AuditMessageLabel1() {
      this.$http.post("/LiandoBidProcess/AuditMessageLabel?bidModeId=" + this.id + "&type=" + 3).then((res) => {
        if (res.data.result.success) {
          this.showmes1 = true;
          this.auditmessage1 = res.data.result.message;
        } else {
          this.showmes1 = false;
        }
      });
    },
    AuditMessageLabel2() {
      this.$http.post("/LiandoBidProcess/AuditMessageLabel?bidModeId=" + this.id + "&type=" + 1).then((res) => {
        if (res.data.result.success) {
          this.showmes2 = true;
          this.auditmessage2 = res.data.result.message;
        } else {
          this.showmes2 = false;
        }
      });
    },
    GetBidFilePageDropDown2001() {
      this.$http.get("/LiandoBidMaster/GetBidFilePageDropDown2001").then((res) => {
        this.examMethodList = res.data.examMethodList;
        this.examMethod = res.data.examMethodList.length > 0 ? res.data.examMethodList[0].value : "";
        this.businessExamTypes = res.data.businessExamType;
        this.businessExamType = res.data.businessExamType.length > 0 ? res.data.businessExamType[0].value : "";
      });
    },
    AuditMessageLabel3() {
      this.$http.post("/LiandoBidProcess/AuditMessageLabel?bidModeId=" + this.id + "&type=" + 4).then((res) => {
        if (res.data.result.success) {
          this.showmes3 = true;
          this.auditmessage3 = res.data.result.message;
        } else {
          this.showmes3 = false;
        }
      });
    },
    subshen() {
      this.$confirm("提交后将不能撤回，确定要执行?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // let obj = {
        //   bidModeId: this.id,
        // };
        this.$http.post("/BidMaster/SubmitBidMasterFilePage?bidModeId=" + this.id).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetBidMasterFilePageShow();
          } else {
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    //已有模板列表
    GetExistTempNameList41() {
      this.$http.get("/BidExamTemp/GetExistTempNameList41").then((res) => {
        this.mobanvalues = res.data;
        this.mobanvalue = res.data.length > 0 ? res.data[0].value : "";
      });
    },
    //下载
    look1(id) {
      // window.open(process.env.VUE_APP_API_URL + path);
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + id);
    },
    //OA跳转
    onup(linkUrl) {
      window.open(linkUrl);
      console.log(linkUrl);
      // window.open(row.urlLink, "_blank");
      // return `${row.urlLink}`;
    },
    //导入已有模板
    daoru() {
      this.$http.post("/BidExamTemp/ImportTempForBid42", { selectedTempId: this.mobanvalue, bidModeId: this.id }).then((res) => {
        if (!res.data.success) {
          this.$alert(res.data.message, {
            confirmButtonText: "确定",
          });
        } else {
          this.$msg.success(res.data.message);
          this.dialogVisible6 = false;
          this.GetTempItemList();
        }
      });
    },
    //招标准备的切换页签调用接口
    tabsClick2(e) {
      if (e.name == "文件答疑") {
        this.GetQustionList();
        this.GetBidMasterPageShow();
        // this.GetQustionFileList();
      }
    },
    // GetExplainDetailList32(val) {
    //   // if (this.toUserName == "") {
    //   //   this.toUserName = this.untoUserName;
    //   // } else {
    //   this.GetQustionFileList();
    //   // this.GetNewLogList_InsideQus();
    //   // this.toUserName = toUserName;
    //   // }
    // },
    //工程文件查看详细
    GetExplainDetailList321() {
      this.GetProcessProgrammeFile();
      this.GetNewLogList_EngineeringFile();
    },
    // GetQustionFileList() {
    //   // let obj = {
    //   //   bidModelId: this.id,
    //   //   masterId: this.selectExplainId,
    //   // };
    //   this.$http
    //     .get("/LiandoBidMaster/GetQustionFileList", {
    //       params: { bidModelId: this.id, masterId: this.selectExplainId },
    //     })
    //     .then(res => {
    //       this.dataList3 = res.data;
    //       this.toUserName = res.data[0].toUserName;
    //     });
    // },
    //工程文件审批
    GetNewLogList_EngineeringFile() {
      this.$http
        .get("/WorkFlowStart/GetNewLogList_EngineeringFile", { params: { bidModeId: this.id, masterId: this.selectExplainIdtwo } })
        .then((res) => {
          // if (res.data.logs.length > 0) {
          this.tableshenpi = res.data.logs;
          this.status = res.data.status;
          if (res.data.logs == "" || res.data.logs == null) {
            this.tableif = false;
          } else {
            this.tableif = true;
          }
          // }
        });
    },
    // GetNewLogList_InsideQus() {
    //   this.$http
    //     .get("/WorkFlowStart/GetNewLogList_InsideQus", { params: { bidModeId: this.id, masterId: this.selectExplainId } })
    //     .then(res => {
    //       // if (res.data.logs.length > 0) {
    //       this.tableshenpi2 = res.data.logs;
    //       this.status2 = res.data.status;
    //       this.rizhititle = res.data.title;
    //       if (res.data.logs == "" || res.data.logs == null) {
    //         this.tableif2 = false;
    //       } else {
    //         this.tableif2 = true;
    //       }
    //       // }
    //     });
    // },
    // BidActionButton18() {
    //   this.$http.get("/BidActionButton/BidActionButton18", { params: { bidModelId: this.id } }).then(res => {
    //     // if (res.data.success) {
    //     this.engineeringFileAuditButton = res.data.engineeringFileAuditButton;
    //     this.insideQusAuditButton = res.data.insideQusAuditButton;
    //     // }
    //   });
    // },
    // tijiao() {
    //   this.$confirm("操作后不能修改,确认要提交审批吗？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     // let obj = {
    //     //   bidModeId: this.id,
    //     // };
    //     this.loading1 = true;
    //     this.$http.get("/LiandoBidMaster/SubmitProcessProgrammeFile?bidModeId=" + this.id).then(res => {
    //       if (res.data.success) {
    //         this.$message.success(res.data.message);
    //         this.GetProcessProgrammeFile();
    //         this.GetNewLogList_EngineeringFile();
    //         this.loading1 = false;
    //       } else {
    //         this.loading1 = false;
    //         this.$message.error(res.data.message);
    //       }
    //     });
    //   });
    // },
    // 内部答疑提交
    tijiao2(id) {
      this.$confirm("操作后不能修改,确认要提交审批吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.dayiloading = true;
        this.$http.post("/LiandoBidMaster/SubmitInsideQustion?bidModeId=" + this.id + "&masterId=" + id).then((res) => {
          if (res.data.result.success) {
            this.$message.success(res.data.result.message);
            this.GetQuestionUserList();
            this.GetQustionList();
            // this.GetNewLogList_InsideQus();
            this.dayiloading = false;
          } else {
            this.dayiloading = false;
            this.$message.error(res.data.result.message);
            this.GetQuestionUserList();
            this.GetQustionList();
            // this.GetNewLogList_InsideQus();
          }
        });
      });
    },
    // seelog(filid) {
    //   // this.GetNewLogList_InsideQus(filid);
    // },
    //删除内部答疑文件
    delzheng(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoBidMaster/DelInisdeQs", { id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetQustionList();
          this.GetQustionFileList();
        });
      });
    },
    //工程文件的选择人员列表
    GetQuestionUserList() {
      this.$http.get("/LiandoBidMaster/GetQuestionUserList?bidModeId=" + this.id).then((res) => {
        this.userList = res.data;
        if (this.userList.length > 0) {
          this.GetBidMasterPageShow();
          this.GetGetDesignCode();
          this.GetProcessProgrammeFile();
        }
      });
    },
    //技术评标模板的列表展示
    GetTechBusinessPercent() {
      this.$http.get("/LiandoBidMaster/GetTechBusinessPercent?bidModeId=" + this.id).then((res) => {
        this.userForm = res.data;
      });
    },
    //上传答疑文件
    upLoadDaYiFile() {
      this.dialogVisibleDaYiFile = true;
      this.loadingdayi = false;
      this.fileList = [];
      this.fileDaYiForm.file = [];
      this.fileDaYiForm.remark = "";
      this.fileDaYiForm.userId = "";
      this.fileDaYiForm.content = "";
      this.file = [];
      this.$refs.uploadDaYiFile.clearFiles();
      this.$nextTick(() => {
        this.$refs.fileDaYiForm.clearValidate(["file"]);
      });
    },
    //获取答疑文件
    GetQustionList() {
      this.$http.get("/LiandoBidMaster/GetQustionList?bidModeId=" + this.id).then((res) => {
        this.daYiFileList = res.data.dataList;
        this.activeNamesneibu = res.data.dataList.map((v) => v.content);
        this.selectExplainId = res.data.dataList.map((v) => v.id);
        this.daYiFileList.fileList = res.data.dataList.fileList;
        this.showUploadButton = res.data.showUploadButton;
        this.pressButton = res.data.pressButton;
        // this.untoUserName = res.data.dataList[0].toUserName;
        // if (res.data.dataList.length > 0) {
        // this.selectExplainId = res.data.dataList[0].id;
        // } else {
        //   this.selectExplainId = "";
        // }
        // this.rizhititle = res.data.logData.title;
        // this.status2 = res.data.logData.status;
        // this.selectExplainId = res.data.dataList.length > 0 ? res.data.dataList[0].id : "";
        // this.toUserName = res.data.dataList.length > 0 ? res.data.dataList[0].toUserName : "";
        // this.toUserName = res.data.dataList[0].toUserName;
        // if (this.daYiFileList.length > 0) {
        //   this.GetExplainDetailList32();
        //   this.GetQustionFileList();
        // }
      });
    },
    choseFile() {
      // if ((this.fileDaYiForm.file = [])) {
      //   this.$message.warning("请上传文件");
      // }
      if (this.fileDaYiForm.file.length > 0) {
        //上传成功钩子
        this.$nextTick(() => {
          this.$refs["fileDaYiForm"].clearValidate(["file"]); //取消该项校验
          // this.$message.error("请上传文件");
        });
      }
      // if (this.fileDaYiForm.file.length > 0) {
      this.$refs["fileDaYiForm"].validate((valid) => {
        if (valid) {
          this.loadingdayi = true;
          let upData = new FormData();
          this.$refs.uploadDaYiFile.submit(); // 这里是执行文件上传的函数，其实也就是获取我们要上传的文件
          this.file.forEach((file) => {
            // 因为要上传多个文件，所以需要遍历
            upData.append("file", file, file.name);
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
          });
          upData.append("BidModeId", this.id); // 这里需要转换一下格式传给后台
          upData.append("remark", this.fileDaYiForm.remark);
          upData.append("userId", this.fileDaYiForm.userId); // 这里需要转换一下格式传给后台
          upData.append("content", this.fileDaYiForm.content); // 这里需要转换一下格式传给后台
          this.$axios
            .post("/api/FileUpload/SendQuestionFile", upData)
            .then((res) => {
              if (res.data.success) {
                this.loadingdayi = false;
                this.$message.success("上传成功");
                this.fileDaYiForm.file = [];
                this.fileDaYiForm.remark = "";
                this.fileDaYiForm.userId = "";
                this.fileDaYiForm.content = "";
                this.GetQuestionUserList();
                this.GetQustionList();
                // this.GetNewLogList_InsideQus();
                this.dialogVisibleDaYiFile = false;
              } else {
                this.loadingdayi = false;
                // this.$message.warning(res.data.message);
              }
            })
            .catch((err) => {
              this.loadingdayi = false;
              this.dialogVisibleDaYiFile = false;
              this.fileDaYiForm.file = [];
              this.fileDaYiForm.remark = "";
              this.fileDaYiForm.userId = "";
              this.fileDaYiForm.content = "";
              this.$alert(err.data.message, {
                confirmButtonText: "确定",
              });
            });
        }
      });
      // } else {
      //   this.$message.warning("请上传文件");
      // }
      // }
      // this.$refs.fileDaYiForm.validate(valid => {
      //   if (valid) {
      //     Object.assign(this.uploadDataDaYiFile, { bidModeId: this.id, ...this.fileDaYiForm });
      //     this.$refs.uploadDaYiFile.submit();
      //   }
      // });
    },
    //通过工程文件审批
    omsubmitgong() {
      this.$confirm("确认要通过工程文件审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.remark == "") {
          let obj = {
            bidModeId: this.id,
            masterId: this.selectExplainIdtwo,
            remark: this.remark,
            isOk: 0,
          };
          this.loadinggong = true;
          this.$http.post("/WorkFlowStart/WF_Process_EngineeringFile_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadinggong = false;
              this.$msg.success("操作成功");
              this.GetNewLogList_EngineeringFile();
              this.GetAuditButton03();
            } else {
              this.loadinggong = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        } else {
          this.$message({
            message: "请先输入审批意见",
            type: "error",
          });
        }
      });
    },
    //驳回工程文件审批
    bohuigong() {
      this.$confirm("确认要驳回工程文件审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (!this.remark == "") {
          let obj = {
            bidModeId: this.id,
            masterId: this.selectExplainIdtwo,
            remark: this.remark,
            isOk: -1,
          };
          this.loadinggong = true;
          this.$http.post("/WorkFlowStart/WF_Process_EngineeringFile_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadinggong = false;
              this.$msg.success("操作成功");
              this.GetNewLogList_EngineeringFile();
              this.GetAuditButton03();
            } else {
              this.loadinggong = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        } else {
          this.$message({
            message: "请先输入审批意见",
            type: "error",
          });
        }
      });
    },
    //下载工程文件
    onDonwLoad(fileId) {
      // window.open(`${process.env.VUE_APP_API_URL}/${file.fileUrl}`, "_blank");
      // window.location.href = process.env.VUE_APP_API_URL + url;
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidCommonFileDownLoad099?fileId=" + fileId);
    },
    // cuiBan(id) {
    //   this.$http.post("/LiandoBidMaster/SendQustionToDo", { id }).then(res => {
    //     res.data.success ? this.$msg.success(res.data.message) : this.$msg.error(res.data.message);
    //   });
    // },
    //删除工程
    deletedayi(fileId) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoBidMaster/DelAnswerFile", { id: fileId }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetQustionList();
        });
      });
    },
    onInput0_100(e) {
      this.$message.closeAll();
      // 验证是否是纯数字
      let isNumber = /^\d*$/.test(e.target.value);
      // 过滤非数字
      e.target.value = e.target.value.replace(/\D/g, "");
      if (!isNumber || e.target.value < 0 || e.target.value > 100) {
        this.$message.warning("只能输入0-100的整数");
      }
      e.target.value = (e.target.value >= 0 && e.target.value <= 100 && e.target.value.match(/^\d*/g)[0]) || null;
    },
    //todo页签
    tabsClick(e) {
      if (e.index == 2) {
        this.GetTempItemList();
        this.GetProjectTempFile();
      }
      if (e.index == 1) {
        this.GetTechBusinessPercent();
      }
    },
    //工程文件的列表
    GetProjectTempFile() {
      this.$http.get("/BidAttach/GetProjectTempFile", { params: { bidModeId: this.id } }).then((res) => {
        this.mubandata = [res.data[0]];
        // this.filesId = res.data[0].id;
      });
    },
    //获取评标模板数据
    GetTempItemList() {
      let obj = {
        bidModeId: this.id,
        tempMasterType: this.activeName1,
      };
      this.$http.get("/BidExamTemp/GetBidExamTempPageShow", { params: obj }).then((res) => {
        this.tempItemList = res.data.tempItemList;
        this.tempMasterId = res.data.tempMasterId;
        this.tempUrl = res.data.tempUrl;
        this.fullScore = res.data.fullScore;
        this.canDeleteOrEdit = res.data.canDeleteOrEdit;
      });
    },
    //催办
    onsubmit() {
      this.$confirm("确定要催办吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoBidMaster/SendToDoToDesign?bidModeId=" + this.id).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetGetDesignCode();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    //设计文件的列表
    GetGetDesignCode() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/LiandoBidMaster/GetGetDesignCode", { params: obj }).then((res) => {
        this.shendata = res.data;
        if (res.data.status == "已完成") {
          this.statuscui = false;
        } else {
          this.statuscui = true;
        }
        this.showdataList = res.data.dataList;
        // this.showindex = res.data.dataList[0].index;
        console.log(this.showdataList);
        // this.showdataList.designCodeList = res.data.dataList.designCodeList;
        // this.returnMessage = res.data.dataList.returnMessage;
        // this.returnButton = res.data.returnButton;
        // this.showindex = res.data.dataList.index;
        // this.urlLink = res.data.designCodeList.map(v => {
        //   return {
        //     urlLink: v,
        //   };
        // });
        // this.designCode = res.data.designCode.map(v => {
        //   return {
        //     name: v,
        //   };
        // });
        // console.log(this.designCode[0]);
        // this.urlLink = res.data.urlLink + this.designCode;
      });
    },
    //设计文件发送待办
    textcui() {
      this.sengdai = true;
      this.$http.post("/LiandoBidMaster/SendToDoToProgramme?bidModeId=" + this.id).then((res) => {
        if (res.data.success) {
          this.sengdai = false;
          this.$message.success(res.data.message);
          this.GetProcessProgrammeFile();
          this.GetNewLogList_EngineeringFile();
          this.GetProgrammeFileList01();
        } else {
          this.sengdai = false;
          this.$message.error(res.data.message);
          this.GetProgrammeFileList01();
        }
      });
    },
    //上传附件
    onUploadPreview() {
      this.dialogVisiblegong = true;
      this.fileList = [];
      this.FileName = "";
    },
    //上传工程文件
    getUploadUrlgong() {
      let fileName = this.FileName;
      return (
        process.env.VUE_APP_API_URL +
        "/api/services/app/LiandoBidMaster/UploadProgrammeFile?bidModeId=" +
        this.id +
        "&fileName=" +
        fileName +
        "&masterId=" +
        this.selectExplainIdtwo
      );
    },
    //上传工程文件
    submitUploadgong() {
      this.loadingfile = true;
      Object.assign(this.uploadData);
      // console.log(this.planId);
      this.$refs.upload.submit();
    },
    //上传工程文件之前
    beforeUploadgong(file) {
      let name = file.name;
      if (this.FileName == "") {
        let index = name.lastIndexOf("\.");
        this.FileName = name.substring(0, index);
      }
    },
    //上传文件成功之后
    onUploadSuccessgong(response, file, fileList) {
      this.$message.success(response.message);
      this.GetProcessProgrammeFile();
      this.GetNewLogList_EngineeringFile();
      this.GetAuditButton03();
      this.dialogVisiblegong = false;
      this.loadingfile = false;
    },
    //转交
    zhuanjiao() {
      this.type = 1;
      this.$refs.choseUser.openfnc();
    },
    //指派
    onUserAdd(id) {
      this.$confirm("确认要指派吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const obj = {
          bidModeId: this.id,
          userId: id.userGuid,
          masterId: this.selectExplainIdtwo,
        };
        this.loadinggong = true;
        this.$http.post("/LiandoBidMaster/RepeatOtherUser", obj).then((res) => {
          if (res.data.success) {
            this.loadinggong = false;
            this.GetNewLogList_EngineeringFile();
            this.GetAuditButton03();
            this.$message.success(res.data.message);
          } else {
            this.loadinggong = false;
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    //提交工程文件
    omsubmit1() {
      this.$confirm("确认要提交工程文件审批吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let obj = {
          bidModeId: this.id,
          masterId: this.selectExplainIdtwo,
          remark: this.remark,
          isOk: 0,
        };
        this.loadinggong = true;
        this.$http.post("/WorkFlowStart/WF_Process_EngineeringFile_Run", obj).then((res) => {
          if (res.data.status == 1) {
            this.loadinggong = false;
            this.$msg.success("操作成功");
            this.GetNewLogList_EngineeringFile();
            this.GetAuditButton03();
            this.GetProcessProgrammeFile();
          } else {
            this.loadinggong = false;
            this.$alert(res.data.message, {
              confirmButtonText: "确定",
            });
          }
        });
      });
    },
    //工程
    GetProgrammeFileList01() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/LiandoBidMaster/GetProgrammeFileList01", { params: obj }).then((res) => {
        this.gongchenglist = res.data.fileList;
        this.gongpressButton = res.data.pressButton;
        this.selectExplainIdtwo = res.data.fileList.length > 0 ? res.data.fileList[0].masterId : "";
        if (this.selectExplainIdtwo != "" || this.selectExplainIdtwo != null) {
          this.GetProcessProgrammeFile();
          this.GetAuditButton03();
        }
      });
    },
    //工程子表
    GetProcessProgrammeFile() {
      let obj = {
        bidModeId: this.id,
        masterId: this.selectExplainIdtwo,
      };
      this.$http.get("/LiandoBidMaster/GetProgrammeFileList", { params: obj }).then((res) => {
        this.fildata = res.data;
      });
    },
    //按钮判断
    GetAuditButton03() {
      let obj = {
        bidModeId: this.id,
        masterId: this.selectExplainIdtwo,
      };
      this.$http.get("/LiandoBidMaster/GetAuditButton03", { params: obj }).then((res) => {
        this.replaceButton = res.data.replaceButton;
        this.submitButton = res.data.submitButton;
        this.uploadButton = res.data.uploadButton;
        this.remark = res.data.ideaRemark;
        if (res.data.showPassButton) {
          this.showPassButtongong = true;
        } else {
          this.showPassButtongong = false;
        }
        if (res.data.showRefuseButton) {
          this.showRefuseButtongong = true;
        } else {
          this.showRefuseButtongong = false;
        }
        if (res.data.showRefuseButton == false && res.data.showPassButton == false) {
          this.showmarkgong = false;
        } else {
          this.showmarkgong = true;
        }
      });
    },
    //查看待办
    look(type) {
      this.$router.push({
        name: "info",
        query: {
          bidModeId: this.id,
          type: type,
        },
      });
    },
    // getUploadUrl() {
    //   return process.env.VUE_APP_API_URL + "/api/FileUpload/SendQuestionFile";
    // },
    //常用附件
    getUploadUrl1() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidProcessAttach1";
    },
    //招标文件
    getUploadUrl2() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidProcessAttach2";
    },
    //从Excel导入
    getUploadUrl4() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidImportExamItem";
    },
    //进入页面的大接口
    GetBidMasterPageShow() {
      // console.log(this.id);
      this.$http.get("/BidMaster/GetBidMasterPageShow", { params: { bidModeId: this.id } }).then((res) => {
        let info = res.data;
        let that = this;
        that.baseInfo = info.baseInfo;
        that.bidAttachList = info.bidAttachList;
        that.businessTempAttach = info.businessTempAttach;
        that.businessTempPath = info.businessTempPath;
        that.dateInfo = info.dateInfo;
        that.techTempAttach = info.techTempAttach;
        that.showSubmitButton = info.showSubmitButton;
        // if (info.showSubmitButton) {
        //   that.showSubmitButton = true;
        // } else {
        //   that.showSubmitButton = false;
        // }
        that.isBidUser = info.isBidUser;
        this.showSavePercentButton = res.data.showSavePercentButton;
        console.log(res.data.showSavePercentButton);
        console.log(res.data.showSubmitButton);
        this.GetBidFileTempList();
        // this.GetBidOtherFileList();
        if (res.data.showEditBaseButton == false) {
          this.bianbut = false;
        } else {
          this.bianbut = true;
        }
        this.$http.get("/BidMaster/GetBidMasterDropDowns").then((res) => {
          this.selectList = res.data;
        });
      });
    },
    //招标文件的审批
    GetBidMasterFilePageShow() {
      this.$http.get("/BidMaster/GetBidMasterFilePageShow", { params: { bidModeId: this.id } }).then((res) => {
        this.showSubmitButtonfile = res.data.showSubmitButton;
        this.masterId = res.data.masterId;
        this.logsfile = res.data.data.logs;
        if (this.logsfile.length > 0) {
          this.logsfileshow = true;
        } else {
          this.logsfileshow = false;
        }
        this.statusfile = res.data.data.status;
        this.showPassButtonfile = res.data.auditButton.showPassButton;
        this.showRefuseButtonfile = res.data.auditButton.showRefuseButton;
      });
    },
    //通过招标文件
    omsubmitfile() {
      if (!this.ideaRemark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要通过审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            bidModeId: this.id,
            masterId: this.masterId,
            remark: this.ideaRemark,
            isOk: 0,
          };
          this.loadingfa = true;
          this.$http.post("/WorkFlowStart/WF_Process_Send_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingfa = false;
              this.$msg.success("操作成功");
              this.GetBidMasterFilePageShow();
            } else {
              this.loadingfa = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    //驳回招标文件
    bohuifile() {
      if (!this.ideaRemark) {
        this.$message({
          message: "请先输入审批意见",
          type: "error",
        });
      } else {
        this.$confirm("确认要驳回审批吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let obj = {
            bidModeId: this.id,
            masterId: this.masterId,
            remark: this.ideaRemark,
            isOk: -1,
          };
          this.loadingfa = true;
          this.$http.post("/WorkFlowStart/WF_Process_Send_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingfa = false;
              this.$msg.success("操作成功");
              this.GetBidMasterFilePageShow();
            } else {
              this.loadingfa = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    // GetbidFileRole() {
    //   this.$http.get("/LiandoBidMaster/GetbidFileRole", { params: { bidModeId: this.id } }).then(res => {
    //     if (res.data.success) {
    //       this.tobut = true;
    //     } else {
    //       this.tobut = false;
    //     }
    //   });
    // },
    // 文件列表
    GetBidFileTempList() {
      this.$http.get("/BidAttach/GetBidFileEditAttachList", { params: { baseId: this.id } }).then((res) => {
        if (res.data.result) {
          this.optionList = res.data.result;
        }
        this.GetBidFileEditAttachList_02();
      });
    },
    // 底稿列表
    GetBidFileEditAttachList_02() {
      this.$http.get("/BidAttach/GetBidFileEditAttachList_02", { params: { baseId: this.id } }).then((res) => {
        if (res.data.result) {
          this.optionList3 = res.data.result;
        }
      });
    },
    // 常用附件的接口
    GetBidFileTempList1() {
      this.$http.get("/BidFileConfig/GetBidFileTempList").then((res) => {
        this.optionList2 = res.data;
      });
    },
    // // 其他附件的接口
    // GetBidOtherFileList() {
    //   this.$http.get("/BidAttach/GetBidOtherFileList", { params: { baseId: this.id } }).then(res => {
    //     this.optionList1 = res.data;
    //   });
    // },
    // 工期及款项
    // beforeUpload(file) {
    //   const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
    //   const whiteList = ["xls", "xlsx"];
    //   if (whiteList.indexOf(fileSuffix) === -1) {
    //     this.$message.error("上传文件只能是 xls、xlsx格式");
    //     return false;
    //   }
    //   const isLt2M = file.size / 1024 / 1024 < 10;

    //   if (!isLt2M) {
    //     this.$message.error("上传文件大小不能超过10兆");
    //     return false;
    //   }
    // },
    // 其他附件导入成功
    onUploadSuccess(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.dialogVisible3 = false;
        this.dialogVisible4 = false;
        this.dialogVisible6 = false;
        this.dialogVisible7 = false;
        this.loadingzhaobiao = false;
        if (this.type1 == 1) {
          this.GetBidFileTempList();
        } else {
          this.GetBidFileEditAttachList_02();
        }
      } else {
        this.loadingzhaobiao = false;
        this.$message.error(response.message);
      }
    },
    // 其他附件导入成功
    onUploadSuccessDaYiFile(response, file, fileList) {
      this.newData.file = fileList;
      if (fileList.length > 0) {
        //上传成功钩子
        this.$nextTick(() => {
          this.$refs["uploadDaYiFile"].clearValidate(["file"]); //取消该项校验
        });
      }
      // if (response.success) {
      //   this.$message.success(response.message);
      //   this.GetQustionList();
      // this.dialogVisibleDaYiFile = false;
      //   this.$refs.uploadDaYiFile.clearFiles();
      //
      // } else {
      //   this.$message.error("上传失败");
      // }
    },
    // 评标模板导入成功
    onUploadSuccess4(response, file, fileList) {
      if (response.success) {
        this.$message.success(response.message);
        this.GetTempItemList();
        this.dialogVisible6 = false;
        this.loadingmoban = false;
      } else {
        // this.dialogVisible6 = false;
        // this.loadingmoban = false;
        this.$message.error(response.message);
      }
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    handleChange2(file, fileList) {
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData2 = {
        FileName: name.substring(0, index),
      };
      console.log(this.uploadData2.FileName);
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    // uploadFile(file) {
    //   // this.file.push(file.file); // append增加数据
    // },
    handleChange1(file, fileList) {
      // if (fileList.length > 0) {
      //   this.fileList = fileList;
      // }
      this.fileDaYiForm.file = fileList;
      if (this.fileDaYiForm.file.length > 0) {
        //上传成功钩子
        this.$nextTick(() => {
          this.$refs["fileDaYiForm"].clearValidate(["file"]); //取消该项校验
        });
      }
      // if (fileList.length > 2) {
      //   let list = fileList;
      //   list.pop();
      //   // let index = list.findIndex(item => item.index == this.index);
      //   // if (index != undefined) {
      //   //   list.splice(index, 1);
      //   //   list.push(file);
      //   //   this.fileList = list;
      //   // }
      // } else {
      //   this.fileList = fileList;
      // }
    },
    // 相关附件
    submitUpload() {
      if (this.isShowInput && this.otherValue != "") {
        this.$message.error("请输入文件名称");
      } else {
        Object.assign(this.uploadData, {
          BidModeId: this.id,
          ShowToSupplier: this.radio,
          FileName: this.optionObj.fileName != "其他" ? this.optionObj.fileName : this.otherValue,
          // FileName: this.fileName,
          FileConfigId: this.optionObj.id,
        });
        this.$refs.upload1.submit();
        this.GetBidFileTempList1();
      }
    },
    // 其他附件
    submitUpload1(opt) {
      // if (!this.uploadData2.FileName || !this.value) {
      //   this.$message.error("请输入文件名称和文件类型");
      //   return;
      // }
      // else if (!this.value) {
      //   this.$message.error("请选择文件类型");
      // }
      if (!this.uploadData2.FileName) {
        this.$message.error("请输入文件名称");
      } else {
        this.loadingzhaobiao = true;
        Object.assign(
          this.uploadData2,
          {},
          { BaseId: this.id, ShowToSupplier: this.radio, FileCateName: this.type1 == 1 ? "其他" : "底稿" }
        );
        this.$refs.upload2.submit();
      }
    },
    // 评标模板的导入
    submitUpload2() {
      if (this.fileList.length == 0) {
        this.$message.error("请上传文件");
      } else {
        this.loadingmoban = true;
        Object.assign(this.uploadData, { BidModeId: this.id, ShowToSupplier: this.radio, TempMasterId: this.tempMasterId });
        this.$refs.upload3.submit();
      }
    },
    // 评标模板的下载
    downld() {
      window.location.href = process.env.VUE_APP_API_URL + this.tempUrl;
    },
    // radioChange() {
    //   this.GetTempItemList();
    // },
    //新增指标
    addzhibiao() {
      this.titlezhibiao = "新增指标";
      this.dialogVisible7 = true;
      this.$nextTick(() => {
        this.$refs.editeva.clearValidate();
      });
      this.editeva = {
        wdName: "",
        zbName: "",
        itemDesc: "",
        fullScore: "",
        id: "",
        tempMasterId: this.tempMasterId,
        bidModeId: this.id,
        showOrder: "",
      };
    },
    // 保存评标指标
    submiteva() {
      this.$refs.editeva.validate((valid) => {
        if (valid) {
          this.dialogVisible7 = false;
          this.$http.post("/BidExamTemp/SaveTempItem", this.editeva).then((res) => {
            res.status == 200
              ? this.$msg.success(res.data.message || res.data.result.message)
              : this.$msg.error(res.data.message || res.data.result.message);

            this.GetTempItemList();
            // this.GetBidExamTempPageShow();
          });
        }
      });
    },
    submiteva1(index) {
      if (this.message == "") {
        this.$alert("请填写退回原因", {
          confirmButtonText: "确定",
        });
      } else {
        this.dialogVisiblesecc = false;
        this.$http.post("/LiandoBidMaster/ReturnToDoToDesign", { bidModeId: this.id, message: this.message, index: index }).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.GetGetDesignCode();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    //导入模板
    lead() {
      this.dialogVisible6 = true;
      this.fileList = [];
      this.loadingmoban = false;
      this.$nextTick(() => {
        this.$refs.moudle6.resetFields();
      });
    },
    // 评标模板右侧表格编辑
    edittptable(opt) {
      (this.titlezhibiao = "编辑指标"), (this.dialogVisible7 = true);
      this.editeva.wdName = opt.wdName;
      this.editeva.zbName = opt.zbName;
      this.editeva.itemDesc = opt.itemDesc;
      this.editeva.fullScore = opt.fullScore;
      this.editeva.showOrder = opt.showOrder;
      this.editeva.id = opt.id;
      this.editeva.tempMasterId = opt.tempMasterId;
      this.editeva.bidModeId = this.id;
    },
    // editInfo() {
    //   // console.log(111);
    //   this.dialogVisible = true;
    // },
    // edit2() {
    //   this.dialogVisible1 = true;
    // },
    upLoad3() {
      this.dialogVisible3 = true;
      this.$nextTick(() => {
        this.$refs.upload1.clearFiles();
      });
      this.GetBidFileTempList1();
    },
    upLoad4(type) {
      this.type1 = type;
      if (type == 1) {
        this.radio = true;
        this.FileCateName = "其他";
      } else {
        this.radio = false;
        this.FileCateName = "底稿";
      }
      this.uploadData2.FileName = "";
      this.value = "";
      this.dialogVisible4 = true;
      this.$nextTick(() => {
        this.$refs.upload2.clearFiles();
      });
    },
    // pubExportdata(url, obj, name) {
    //   this.$axios.post(url, obj).then(response => {
    //     console.log(response);
    //     // 提取文件名
    //     // const fileName = row.fileName // + row.fileExtName      .response.headers['content-disposition'].match(/filename=(.*)/)[1]
    //     let fileName = name + new Date().toLocaleDateString();
    //     // console.log(fileName)
    //     // 将二进制流转为blob
    //     const blob = new Blob([response.data], { type: response.headers["content-type"] });
    //     if (typeof window.navigator.msSaveBlob !== "undefined") {
    //       // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    //       window.navigator.msSaveBlob(blob, decodeURI(fileName));
    //     } else {
    //       // 创建新的URL并指向File对象或者Blob对象的地址
    //       const blobURL = window.URL.createObjectURL(blob);
    //       // 创建a标签，用于跳转至下载链接
    //       const tempLink = document.createElement("a");
    //       tempLink.style.display = "none";
    //       tempLink.href = blobURL;
    //       tempLink.setAttribute("download", decodeURI(fileName));
    //       // 兼容：某些浏览器不支持HTML5的download属性
    //       if (typeof tempLink.download === "undefined") {
    //         tempLink.setAttribute("target", "_blank");
    //       }
    //       // 挂载a标签
    //       document.body.appendChild(tempLink);
    //       tempLink.click();
    //       document.body.removeChild(tempLink);
    //       // 释放blob URL地址
    //       window.URL.revokeObjectURL(blobURL);
    //     }
    //   });
    // },
    // 相关附件下载
    download(fileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + fileId);
      // window.location.href = process.env.VUE_APP_API_URL + url;
    },
    // 相关附件的导入
    beforeUpload1(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = this.getOneFileTemp.fileExtName.split("|");
      console.log(file);
      // console.log(fileSuffix);
      // console.log(whiteList);
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");

        return false;
      }
      const isLt = file.size / 1024 / 1024 < this.getOneFileTemp.maxFileSize;
      if (!isLt) {
        this.$message.error("上传文件大小不能超过" + this.getOneFileTemp.maxFileSize + "兆");
        return false;
      }
    },
    // 评标模板导入
    beforeUpload2(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = [".xls", ".xlsx"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.loadingmoban = false;
        this.$message.error("上传文件格式有误");
        return false;
      }
      const isLt = file.size / 1024 / 1024 < 20;
      if (!isLt) {
        this.loadingmoban = false;
        this.$message.error("上传文件大小不能超过" + 20 + "兆");
        return false;
      }
    },
    // 其他附件的导入
    beforeUpload3(file) {
      let name = file.name;
      let index = name.lastIndexOf("\.");
      this.uploadData2 = {
        FileName: name.substring(0, index),
      };
      console.log(this.uploadData2.FileName);
      // const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      // const whiteList = [".doc", ".docx", ".xls", ".xlsx"];
      // if (whiteList.indexOf(fileSuffix) === -1) {
      //   this.$message.error("上传文件格式有误");
      //   return false;
      // }
      // const isLt = file.size / 1024 / 1024 < 50;
      // if (!isLt) {
      //   this.$message.error("上传文件大小不能超过" + 50 + "兆");
      //   return false;
      // }
    },
    // 相关附件的选择val
    upLoadeChange(val) {
      console.log(this.val);
      let str = this.optionList2.find((item) => item.fileName == val);
      this.optionObj = str;
      console.log(str);
      this.isShowInput = str.fileName == "其他" ? true : false;
      this.getOneFileTemp = str;
      // this.$http.get("/BidFileConfig/GetOneFileTempById", { params: { id: this.optionValue } }).then(res => {
      //   this.getOneFileTemp = res.data;
      // });
    },
    // 评标模板删除右侧指标
    deletetptable(opt) {
      // let id = [row.id];
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/BidExamTemp/DeleteTempItem", { id: opt.id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          // res.data.success ? this.GetTempItemList() : "";
          this.GetTempItemList();
        });
      });
    },
    // 其他附件的删除
    deletes(row) {
      let id = [row.id];
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/BidAttach/DeleteBidAttachByIds", id).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetBidFileTempList();
          // this.GetBidOtherFileList();
          this.GetBidFileEditAttachList_02();
        });
      });
    },
    onEditSave() {
      this.dialogVisible = false;
      this.GetBidMasterPageShow();
      this.$emit("GetBidMasterPageShow");
    },
    //提交审批
    // SubmitBidFile() {
    //   this.$confirm("确定要提交审批吗?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).then(() => {
    //     console.log(this.id);
    //     this.$http.post("/BidMaster/SubmitBidFile?modeId=" + this.id).then(res => {
    //       res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
    //     });
    //   });
    // },
    // 工期及款项
    onSubmit1() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loadingSave = true;
          this.$http.post("/BidMaster/UpdateBidMasterDate", { ...this.dateInfo, bidModeId: this.id }).then((res) => {
            this.loadingSave = false;
            if (res.data.success) {
              this.dialogVisible1 = false;
              this.$message.success(res.data.message);
              this.$refs.form.clearValidate();
              this.GetBidMasterPageShow();
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    onCancle() {
      this.dialogVisible1 = false;
      this.$refs["form"].clearValidate();
    },
    // ...mapMutations("menu", { initMenu: "init" }),
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-button--danger {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
::v-deep .el-button--danger:focus,
.el-button--danger:hover {
  color: #fff;
  background-color: #5e83da;
  border-color: #5e83da;
}

::v-deep.el-textarea__inner {
  height: 100px;
}
::v-deep.el-dialog__body {
  padding: 0;
}
.tits {
  display: flex;
  justify-content: flex-end;
  /*margin-top: 30px;*/
}
// .flexs {
//   display: flex;
//   justify-content: space-between;
//   /*margin-top: 30px;*/
// }
.score {
  float: right;
  margin-top: 10px;
}
.btns {
  text-align: right;
  margin: 10px 0;
}
.btns1 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.flex1 {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
