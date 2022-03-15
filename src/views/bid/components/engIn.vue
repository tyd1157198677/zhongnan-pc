<template>
  <div class="">
    <el-tabs v-model="activeName">
      <el-tab-pane label="工程文件审批" name="工程文件审批">
        <el-alert :title="auditmessage1" v-if="showmes1" type="warning" :closable="false"></el-alert>
        <div class="btns">
          <el-button type="danger" size="mini" v-loading="sengdai" v-if="gongpressButton" @click="textcui">发送待办</el-button>
          <el-button v-if="isBidbutton" type="danger" size="mini" @click="look(2)">查看待办</el-button>
        </div>
        <div style="margin-bottom: 20px">
          <el-table empty-text="无符合条件的记录" stripe border element-loading-text="请稍候,数据正在加载中..." :data="mubandata">
            <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
            <el-table-column label="文件名称" prop="fileName" align="left"> </el-table-column>
            <el-table-column label="文件大小" width="120px" prop="showFileSize" align="center"> </el-table-column>
            <el-table-column label="上传人" width="120px" prop="uploadUserName" align="center"> </el-table-column>
            <el-table-column label="上传时间" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.uploadDate, "yyyy-MM-dd hh:mm") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="下载" width="80" align="center">
              <template slot-scope="scope">
                <i class="el-icon-download" @click="look1(scope.row.id)"></i>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-bottom: 20px">
          <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="gongchenglist">
            <el-table-column type="index" width="70" label="序号" align="center"> </el-table-column>
            <el-table-column label="工程负责人" prop="userName" align="center"> </el-table-column>
            <el-table-column label="创建时间" align="center" width="200">
              <template slot-scope="scope">
                <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center" width="120px">
              <template slot-scope="scope">
                <span>{{ scope.row.auditStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-radio
                  @change="GetExplainDetailList321(scope.row.masterId)"
                  v-model="selectExplainIdtwo"
                  :label="scope.row.masterId"
                  style="color: #409eff"
                  >查看明细</el-radio
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="fildata" v-loading="loading">
          <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
          <el-table-column prop="fileName" label="文件名称" align="left"> </el-table-column>
          <el-table-column prop="fileSize" width="150" label="文件大小" align="center"> </el-table-column>
          <el-table-column prop="fileSize" width="150" label="文件类型" align="center"> </el-table-column>
          <el-table-column prop="creationTime" width="180" label="上传时间" align="center">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creationUserName" width="150" label="上传人" align="center"> </el-table-column>

          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <i class="el-icon-download" @click="look1(scope.row.id)"></i>
              <i v-if="scope.row.canDel" class="el-icon-delete" title="删除" @click="onDelete(scope.row)"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="float-right mb-2" v-loading="loadinggong" style="margin-top: 10px">
          <el-button type="primary" size="small" v-if="uploadButton" @click="onUploadPreview">上传附件</el-button>
          <el-button size="small" type="primary" v-if="replaceButton" @click="zhuanjiao">指派</el-button>
        </div>

        <div style="margin-top: 50px">
          <el-form v-if="showmarkgong" v-loading="loadinggong" :rules="rulesrizhi">
            <el-form-item label="审批意见：" prop="remark" style="margin-top: 20px">
              <el-input
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 4 }"
                placeholder="请输入审批意见"
                v-model="remark"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" v-if="submitButton" type="primary" style="float: right; margin-top: 10px" @click="omsubmit1"
                >提交</el-button
              >
              <el-button size="mini" v-if="showPassButtongong" type="primary" style="float: right; margin-top: 10px" @click="omsubmitgong"
                >通过</el-button
              >
              <el-button
                size="mini"
                v-if="showRefuseButtongong"
                type="primary"
                style="float: right; margin-top: 10px; margin-right: 10px"
                @click="bohuigong"
                >驳回</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-top: 50px" v-if="tableif">
          <span>审批日志({{ statusgongcheng }})</span>
          <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableshenpi">
            <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
            <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
            <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
            <el-table-column prop="creationTime" width="200" label="待办时间" align="center">
              <template slot-scope="scope"
                ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
            <el-table-column prop="dealTime" width="200" label="处理时间" align="center">
              <template slot-scope="scope"
                ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
              >
            </el-table-column>
            <el-table-column prop="status" width="100" label="结果" align="center"> </el-table-column>
            <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设计文件审批" name="设计文件审批">
        <div>
          <!-- <div style="float:left;color:red" v-if="returnMessage != '' || returnMessage != null">{{ returnMessage }}</div> -->
          <el-button style="float: right; margin-left: 10px; margin-bottom: 10px" type="danger" size="mini" @click="look(1)"
            >查看待办</el-button
          >
          <el-button
            style="float: right; margin-left: 10px; margin-bottom: 10px"
            type="danger"
            v-if="isBidUser"
            size="mini"
            @click="onsubmit"
            >催办</el-button
          >
        </div>
        <table class="layui-table el-table__body mt-3">
          <tbody>
            <tr>
              <td style="width: 120px" class="right">设计审稿人：</td>
              <td>
                {{ shendata.userName }}
              </td>
              <td class="right">上传时间：</td>
              <td>
                <!-- 2021-6-30 -->
                {{ parseTime(shendata.finishTime, "yyyy-MM-dd hh:mm") }}
              </td>
              <td style="width: 150px" class="right">联系方式：</td>
              <td>
                {{ shendata.phone }}
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 20px">
          <div v-for="(item, index) in showdataList" :key="index">
            <div style="margin-bottom: 20px">
              <span style="margin-right: 20px">第{{ item.index }}次提交</span
              ><span style="margin-right: 20px" v-if="item.returnMessage != '' || item.returnMessage != null">{{
                item.returnMessage
              }}</span>
              <span style="margin-right: 20px" v-if="item.creationTime != '' || item.creationTime != null"
                >上传时间：{{ parseTime(item.creationTime, "yyyy-MM-dd hh:mm") }}</span
              >
              <span style="margin-right: 20px" v-if="item.returnTime != null"
                >驳回时间：{{ parseTime(item.returnTime, "yyyy-MM-dd hh:mm") }}</span
              >
              <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="item.designCodeList">
                <el-table-column type="index" width="80" label="序号" align="center"> </el-table-column>
                <el-table-column label="OA流程号" prop="designCode" align="center"> </el-table-column>
                <el-table-column label="状态" prop="status" align="center" width="150"> </el-table-column>
                <el-table-column prop="linkUrl" label="文件下载链接" align="center" width="200">
                  <template slot-scope="scope">
                    <i @click="onup(scope.row.linkUrl)" class="el-icon-share"></i>
                  </template>
                </el-table-column>
              </el-table>
              <!-- <el-button
                style="float:right;margin-left:10px;margin-bottom:10px;margin-top:10px"
                v-if="item.returnButton"
                type="danger"
                size="mini"
                @click="goback(item.index)"
                >退回</el-button
              > -->
            </div>
          </div>
        </div>
        <div style="margin-top: 20px">
          <el-row v-if="sumitButton">
            <el-form style="margin-top: 20px">
              <el-form-item label="OA流程号：">
                <el-input
                  clearable
                  placeholder="请填写OA流程号"
                  v-for="(item, index) in putList"
                  :key="index"
                  v-model="item.val"
                  style="width: 150px; margin-right: 10px"
                ></el-input>
                <div style="display: inline-block">
                  <el-input
                    style="width: 150px"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button v-if="!inputVisible && isShowAdd" type="primary" size="small" @click="showInput">新增流程号</el-button>
                </div>
              </el-form-item>
            </el-form>
            <el-col :span="24">
              <div class="float-right" style="margin-top: 10px">
                <el-button type="primary" v-if="sumitButton" size="small" @click="save">提交</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="内部文件答疑" name="内部文件答疑">
        <el-alert :title="auditmessage2" v-if="showmes2" type="warning" :closable="false"></el-alert>
        <div class="btns" style="margin-bottom: 20px">
          <div style="float: left; color: red">提交答疑后相关人员才能收到待办</div>
          <div v-if="isBidUser">
            <el-button style="float: right" type="danger" v-if="showUploadButton" size="mini" @click="upLoadDaYiFile"
              >上传答疑文件</el-button
            >
            <!-- <el-button style="float:right" type="danger" size="mini" @click="upLoadDaYiFile">上传答疑文件</el-button> -->
          </div>
        </div>
        <br />
        <el-collapse v-model="activeNamesneibu" style="margin-top: 10px">
          <el-collapse-item :name="item.content" v-for="(item, index) in daYiFileList" :key="index" style="margin-top: 20px">
            <template slot="title">
              <span class="infonametits">{{ item.content }}</span>
            </template>
            <div style="float: right">
              <span v-if="item.creationTime != null || item.creationTime != ''" style="margin-right: 10px"
                >提交时间：{{ parseTime(item.creationTime, "yyyy-MM-dd hh:mm") }}</span
              ><span v-if="item.auditStatus != null">状态：{{ item.auditStatus }}</span>
            </div>
            <!-- <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              v-loading="dayiloading"
              :data="daYiFileList"
            >
              <el-table-column label="答复人" align="right" width="150"> </el-table-column>
              <el-table-column :label="item.toUserName" align="left"> </el-table-column>
            </el-table> -->
            <table class="layui-table el-table__body">
              <tbody>
                <tr>
                  <td class="center">答复人</td>
                  <td colspan="10">
                    {{ item.toUserName }}
                  </td>
                </tr>
              </tbody>
            </table>
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              v-loading="dayiloading"
              :data="item.fileList"
            >
              <el-table-column label="相关附件" align="center">
                <el-table-column type="index" width="70" label="序号" align="center"> </el-table-column>
                <el-table-column label="附件名称" prop="fileName" align="center"> </el-table-column>
                <el-table-column label="文件大小" prop="showFileSize" align="center"> </el-table-column>
                <el-table-column label="文件类型" prop="fileExtName" align="center"> </el-table-column>

                <el-table-column label="操作" align="center" width="150">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-delete"
                      title="删除"
                      v-if="scope.row.delButton"
                      style="margin-right: 10px"
                      @click="deletedayi(scope.row.fileId)"
                    ></i>
                    <i class="el-icon-download" title="下载" @click="onDonwLoad(scope.row.fileId)"></i>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <div style="margin-top: 10px">
              <el-button
                type="primary"
                v-loading="dayiloading"
                v-if="item.showSubmitButton"
                style="float: right; margin-left: 10px; margin-bottom: 10px"
                @click="delzheng(item.id)"
                size="small"
                >删除</el-button
              >
              <el-button
                type="primary"
                v-loading="dayiloading"
                v-if="item.showSubmitButton"
                style="float: right; margin-left: 10px; margin-bottom: 10px"
                @click="tijiao2(item.id)"
                size="small"
                >提交</el-button
              >
              <!-- <el-button type="primary" style="float:right;margin-left:10px;margin-bottom:10px" @click="delzheng(item.id)" size="small"
                    >删除</el-button
                  >
                  <el-button type="primary" style="float:right;margin-left:10px;margin-bottom:10px" @click="tijiao2(item.id)" size="small"
                    >提交</el-button
                  > -->
            </div>
            <div style="margin-top: 50px">
              <el-form
                v-if="item.auditButton.showPassButton || item.auditButton.showRefuseButton"
                v-loading="loadingneibu"
                :rules="rulesrizhi"
              >
                <el-form-item label="审批意见：" prop="ideaRemark" style="margin-top: 20px">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 4 }"
                    v-if="!item.auditButton.ideaRemark != '' || item.auditButton.ideaRemark != null"
                    :placeholder="item.auditButton.ideaRemark"
                    v-model="item.remark"
                    style="width: 100%"
                  ></el-input>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 4 }"
                    v-else
                    placeholder="请输入审批意见"
                    v-model="item.remark"
                    style="width: 100%"
                  ></el-input>
                  <div style="color: red; margin: 10px 0">如对某条答疑有意见，请填写审批意见</div>
                </el-form-item>
                <el-form-item>
                  <el-button
                    size="mini"
                    v-if="item.auditButton.showPassButton"
                    type="primary"
                    style="float: right; margin-top: 10px"
                    @click="omsubmit(item)"
                    >通过</el-button
                  >
                  <el-button
                    size="mini"
                    v-if="item.auditButton.showRefuseButton"
                    type="primary"
                    style="float: right; margin-top: 10px; margin-right: 10px"
                    @click="bohui(item)"
                    >驳回</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div style="margin-top: 50px" v-if="item.logData.logs.length > 0">
              <span>审批日志(<strong>标题：</strong>{{ item.logData.title }})({{ item.logData.status }})</span>
              <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="item.logData.logs">
                <el-table-column type="index" width="60" label="序号" align="center"> </el-table-column>
                <el-table-column prop="activityNameEnum" width="200" label="步骤" align="center"> </el-table-column>
                <el-table-column prop="userName" label="经办人" width="200" align="center"> </el-table-column>
                <el-table-column prop="creationTime" width="200" label="待办时间" align="center">
                  <template slot-scope="scope"
                    ><span>{{ parseTime(scope.row.creationTime, "yyyy-MM-dd hh:mm") }}</span></template
                  >
                </el-table-column>
                <el-table-column prop="dealTime" width="200" label="处理时间" align="center">
                  <template slot-scope="scope"
                    ><span>{{ parseTime(scope.row.dealTime, "yyyy-MM-dd hh:mm") }}</span></template
                  >
                </el-table-column>
                <el-table-column prop="status" width="100" label="结果" align="center"> </el-table-column>
                <el-table-column prop="comments" label="意见/备注" align="center"> </el-table-column>
              </el-table>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="外部文件答疑" name="外部文件答疑">
        <el-alert :title="auditmessage3" v-if="showmes3" type="warning" :closable="false"></el-alert>
        <div>
          <!-- v-if="isShowBtn"  -->
          <span style="color: red">需要在【操作】列中提交答疑审批，审批通过后投标方才能查看</span>
          <el-button style="float: right; margin-bottom: 10px" v-if="isShowBtn" type="primary" size="mini" @click="addDyi"
            >新增答疑</el-button
          >
        </div>
        <el-collapse v-model="activeNames">
          <el-collapse-item :name="item.answerName" v-for="(item, index) in dataList2" :key="index" style="margin-top: 20px">
            <template slot="title">
              <span class="infonametits">{{ item.answerName }}</span>
            </template>
            <div style="float: right">
              <span v-if="item.creationTime != null || item.creationTime != ''" style="margin-right: 10px"
                >提交时间：{{ parseTime(item.creationTime, "yyyy-MM-dd hh:mm") }}</span
              ><span v-if="item.submitStatus != null || item.submitStatus">状态：{{ item.submitStatus }}</span>
            </div>
            <!-- <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              v-loading="subloading"
              :data="dataList2"
            >
              <el-table-column label="答复供方" align="right" width="150"> </el-table-column>
              <el-table-column :label="item.detail.supplierNameList" align="left"> </el-table-column>
            </el-table> -->
            <table class="layui-table el-table__body">
              <tbody>
                <tr>
                  <td class="center">答复供方</td>
                  <td colspan="10">
                    {{ item.detail.supplierNameList }}
                  </td>
                </tr>
              </tbody>
            </table>
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              v-loading="subloading"
              :data="item.detail.answerFileList"
            >
              <el-table-column label="相关附件" align="center">
                <el-table-column type="index" width="70" label="序号" align="center"> </el-table-column>
                <el-table-column label="附件名称" prop="fileName" align="center"> </el-table-column>
                <el-table-column label="文件大小" prop="fileSize" align="center"> </el-table-column>
                <el-table-column label="文件类型" prop="fileExtName" align="center"> </el-table-column>
                <el-table-column label="操作" align="center" width="150">
                  <template slot-scope="scope">
                    <i
                      class="el-icon-delete"
                      v-if="scope.row.canDelete"
                      title="删除"
                      style="margin-right: 10px"
                      @click="del(scope.row.fileId, 2)"
                    ></i>
                    <i class="el-icon-download" title="下载" @click="downLoad(scope.row.fileId, 2)"></i>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
            <div style="margin-top: 10px">
              <el-button
                type="primary"
                v-if="item.canEdit"
                style="float: right; margin-left: 10px; margin-bottom: 10px"
                @click="del(item.id, 1)"
                size="small"
                v-loading="subloading"
                >删除</el-button
              >
              <el-button
                type="primary"
                v-if="item.canEdit"
                style="float: right; margin-left: 10px; margin-bottom: 10px"
                @click="sub(item.id)"
                size="small"
                v-loading="subloading"
                >提交</el-button
              >
            </div>

            <div style="margin-top: 30px">
              <el-form
                v-if="item.auditButton.showPassButton || item.auditButton.showRefuseButton"
                v-loading="loadingwaibu"
                :rules="rulesrizhi"
              >
                <el-form-item label="审批意见：" prop="ideaRemark" style="margin-top: 20px">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 4 }"
                    v-if="item.auditButton.ideaRemark != '' || item.auditButton.ideaRemark != null"
                    :placeholder="item.auditButton.ideaRemark"
                    v-model="item.remark"
                    style="width: 100%"
                  ></el-input>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 6, maxRows: 4 }"
                    v-else
                    placeholder="请输入审批意见"
                    v-model="item.remark"
                    style="width: 100%"
                  ></el-input>
                  <div style="color: red; margin: 10px 0">如对某条答疑有意见，请填写审批意见</div>
                </el-form-item>
                <el-form-item>
                  <el-button
                    size="mini"
                    v-if="item.auditButton.showPassButton"
                    type="primary"
                    style="float: right; margin-top: 10px"
                    @click="omsubmitwaibu(item)"
                    >通过</el-button
                  >
                  <el-button
                    size="mini"
                    v-if="item.auditButton.showRefuseButton"
                    type="primary"
                    style="float: right; margin-top: 10px; margin-right: 10px"
                    @click="bohuiwaibu(item)"
                    >驳回</el-button
                  >
                </el-form-item>
              </el-form>
            </div>
            <div style="margin-top: 50px" v-if="item.logData.logs.length > 0">
              <div slot="header" class="clearfix">
                <span>审批日志({{ item.logData.status }})</span>
              </div>
              <div class="text item">
                <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="item.logData.logs">
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
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    <el-dialog width="70%" :title="tit + '答疑文件'" :visible.sync="dialogVisible1">
      <div style="color: red; margin-bottom: 10px; margin-left: 20px">注：一个答疑文件可同时发送给多个投标方</div>
      <el-form ref="newData" :model="newData" label-width="160px" label-position="right" size="mini" :rules="rules">
        <el-form-item label="答疑主体名称" prop="answerName">
          <el-input v-model="newData.answerName" placeholder="例如：第1次答疑"></el-input>
        </el-form-item>
        <el-form-item label="选择要答复的投标方" prop="supplierIds">
          <el-checkbox-group v-model="newData.supplierIds" :indeterminate="true">
            <el-checkbox v-for="city in dataList" :label="city.id" :key="city.id">{{ city.comFullName }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="上传文件" prop="file">
          <el-upload
            ref="upload"
            multiple
            name="File"
            :headers="header"
            :on-change="handleSuccess"
            action=""
            :auto-upload="false"
            :http-request="httpRequest1"
          >
            <el-button size="small" type="primary">选取文件</el-button>
            <span style="margin-left: 10px; color: red">可上传多个文件</span>
            <div slot="tip" class="el-upload__tip">允许文件类型：.doc|.docx|.xls|.xlsx|.rar|.zip, 单文件最大：100 兆</div>
          </el-upload>
          <el-button style="float: right" type="primary" @click="newForm" size="mini" v-loading="loading2">保 存</el-button>
        </el-form-item>
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
        <el-form-item label="选择文件">
          <el-upload
            class="upload-demo"
            ref="uploadDaYiFile"
            name="File"
            v-loading="loadingdayi"
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
      <el-form class="mt-0" size="small" label-width="120px">
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
            :action="getUploadUrl()"
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
  </div>
</template>

<script>
import { parseTime } from "@/util";
import choseUser from "@/components/choseUser";
export default {
  components: { choseUser, publicUpload: () => import("@/components/publicUpload.vue") },
  props: ["id"],
  data() {
    return {
      value: "",
      showholder: false,
      showhold: true,
      valuehold1: "",
      valuehold2: "",
      remark: "",
      ideaRemarkneibu: "",
      activeNames: [],
      showmes1: false,
      showmes2: false,
      showmes3: false,
      auditmessage1: "",
      auditmessage2: "",
      auditmessage3: "",
      activeNamesneibu: [],
      replaceButton: false,
      uploadButton: false,
      showRefuseButtongong: false,
      submitButton: false,
      showPassButtongong: false,
      showPassButtonwaibu: false,
      showRefuseButtonwaibu: false,
      loadingwaibu: false,
      loadinggong: false,
      dialogVisiblegong: false,
      sengdai: false,
      isBidbutton: true,
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
      userList: [0],
      rulseDaYiFile: {
        userId: [{ required: true, message: "请选择模板类型", trigger: "change" }],
        content: [{ required: true, message: "请输入标题", trigger: "blur" }],
        remark: [{ required: true, message: "请输入审批意见", trigger: "blur" }],
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
      },
      ruleScore: {
        techPercent: [{ required: true, message: "请输入技术得分占比", trigger: "blur" }],
        businessPercent: [{ required: true, message: "请输入商务得分占比", trigger: "blur" }],
      },
      showRefuseButton: false,
      showPassButton: false,
      showmark: false,
      showmarkgong: false,
      showmarkwaibu: false,
      ideaRemarkwaibu: "",
      uploadDate: "",
      message: "",
      returnMessage: "",
      returnTime: "",
      creationTime: "",
      showindex: "",
      showdataList: [],
      putList: [{ val: "" }, { val: "" }, { val: "" }, { val: "" }, { val: "" }],
      inputValue: "",
      sumitButton: false,
      returnButton: false,
      inputVisible: false,
      daYiFileList: [],
      activeName: "工程文件审批",
      baseInfo: {},
      uploadData2: {
        FileName: "",
      },
      FileName: "",
      status: "",
      tit: "",
      dataList: [],
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
      tableshenpiwaibu: [],
      tableshenpi2: [],
      fileList: [],
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
      rizhititle: "",
      showbutton: true,
      titlezhibiao: "",
      optionValue: "",
      otherValue: "",
      isShowInput: false,
      loading: false,
      loadingneibu: false,
      loading1: "",
      loading2: "",
      dayiloading: false,
      getOneFileTemp: {},
      techTempAttach: "",
      radio: true,
      fileName: "",
      selectExplainId: "",
      selectExplainId1: "",
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
      subloading: false,
      isShowBtn: false,
      dataList2: [],
      supplierNameList: "",
      statuscui: "",
      fullScore: "",
      shendata: {},
      designCodeList: [],
      index: 2,
      file: [],
      // },
      ideaRemark: "",
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
      statusgongcheng: "",
      file: [],
      newData: {
        supplierIds: [],
        answerName: "",
        file: [],
      },
      rulesrizhi: {
        // ideaRemarkwaibu: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
        // ideaRemark: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
        // remark: [{ required: true, message: "审批意见不能为空", trigger: "blur" }],
      },
      dataList3: [],
      tableListwaibu: [],
      engineeringFileAuditButton: false,
      insideQusAuditButton: false,
      activeName1: "投标方质疑文件",
      tempMasterId: "",
      radioList: [{ label: "技术评标模板", tempMasterType: "技术评标模板" }],
    };
  },
  computed: {
    isShowAdd() {
      return this.putList.every((v) => v.val != "");
    },
  },
  mounted() {
    this.GetQustionList();
    this.GetQuestionUserList();
    this.GetbidFileRole();
    // this.GetNewLogList_InsideQus();
    this.GetNewLogList_EngineeringFile();
    this.BidActionButton18();
    this.GetBidMasterPageShow();
    this.GetExistTempNameList41();
    this.GetProgrammeFileList01();
    this.GetProjectTempFile();
    this.GetQsStatus();
    this.GetNewLogList_SupQus();
    this.AuditMessageLabel1();
    this.AuditMessageLabel2();
    this.AuditMessageLabel3();
  },
  methods: {
    parseTime,
    tomethgogongcheng() {
      this.GetQustionList();
      this.GetQuestionUserList();
      this.GetbidFileRole();
      // this.GetNewLogList_InsideQus();
      this.GetNewLogList_EngineeringFile();
      this.BidActionButton18();
      this.GetBidMasterPageShow();
      this.GetExistTempNameList41();
      this.GetProgrammeFileList01();
      this.GetProjectTempFile();
      this.GetQsStatus();
      this.GetNewLogList_SupQus();
      this.AuditMessageLabel1();
      this.AuditMessageLabel2();
      this.AuditMessageLabel3();
    },
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
    AuditMessageLabel3() {
      this.$http.post("/LiandoBidProcess/AuditMessageLabel?bidModeId=" + this.id + "&type=" + 2).then((res) => {
        if (res.data.result.success) {
          this.showmes3 = true;
          this.auditmessage3 = res.data.result.message;
        } else {
          this.showmes3 = false;
        }
      });
    },
    onup(linkUrl) {
      window.open(linkUrl);
      console.log(linkUrl);
    },
    httpRequest(param) {
      this.file.push(param.file); // 一般情况下是在这里创建FormData对象，但我们需要上传多个文件，为避免发送多次请求，因此在这里只进行文件的获取，param可以拿到文件上传的所有信息
      this.fileDaYiForm.file = this.file;
    },
    httpRequest1(param) {
      this.file.push(param.file); // 一般情况下是在这里创建FormData对象，但我们需要上传多个文件，为避免发送多次请求，因此在这里只进行文件的获取，param可以拿到文件上传的所有信息
      this.newData.file = this.file;
    },
    handleSuccess(file, fileList) {
      this.newData.file = fileList;
      if (fileList.length > 0) {
        //上传成功钩子
        this.$nextTick(() => {
          this.$refs["newData"].clearValidate(["file"]); //取消该项校验
        });
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.putList.push({ val: this.inputValue });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    save() {
      this.$confirm("提交后将不能修改，是否继续吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.index != "" || this.index != null) {
          let obj = {
            bidModeId: this.id,
            designCode: this.putList.map((v) => v.val),
            // todoId: this.todoId,
            // index: this.index,
          };
          this.$http.post("/LiandoBidMaster/UpdateDesignCode", obj).then((res) => {
            if (!res.data.success) {
              this.$msg.error(res.data.message);
            } else {
              this.$msg.success(res.data.message);
              this.GetGetDesignCode();
            }
          });
        } else {
          let obj1 = {
            bidModeId: this.id,
            designCode: this.putList.map((v) => v.val),
            todoId: this.todoId,
          };
          this.$http.post("/LiandoBidMaster/UpdateDesignCode", obj1).then((res) => {
            if (!res.data.success) {
              this.$msg.error(res.data.message);
            } else {
              this.$msg.success(res.data.message);
              this.GetGetDesignCode();
            }
          });
        }
      });
    },
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
    goback(index) {
      this.dialogVisiblesecc = true;
      this.message = "";
      this.index = index;
    },
    GetExistTempNameList41() {
      this.$http.get("/BidExamTemp/GetExistTempNameList41").then((res) => {
        this.mobanvalues = res.data;
        this.mobanvalue = res.data.length > 0 ? res.data[0].value : "";
      });
    },
    look1(id) {
      // window.open(process.env.VUE_APP_API_URL + path);
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + id);
    },

    // GetQustionFileList() {
    //   this.$http
    //     .get("/LiandoBidMaster/GetQustionFileList", {
    //       params: { bidModelId: this.id, masterId: this.selectExplainId1 },
    //     })
    //     .then(res => {
    //       this.dataList3 = res.data;
    //       this.toUserName = res.data[0].toUserName;
    //     });
    // },
    GetNewLogList_EngineeringFile() {
      this.$http
        .get("/WorkFlowStart/GetNewLogList_EngineeringFile", { params: { bidModeId: this.id, masterId: this.selectExplainIdtwo } })
        .then((res) => {
          // if (res.data.logs.length > 0) {
          this.tableshenpi = res.data.logs;
          this.statusgongcheng = res.data.status;
          if (res.data.logs == "" || res.data.logs == null) {
            this.tableif = false;
          } else {
            this.tableif = true;
          }
          // }
        });
    },
    GetExplainDetailList321() {
      this.GetProcessProgrammeFile();
      this.GetNewLogList_EngineeringFile();
      this.GetAuditButton03();
    },
    // GetNewLogList_InsideQus() {
    //   this.$http
    //     .get("/WorkFlowStart/GetNewLogList_InsideQus", { params: { bidModeId: this.id, masterId: this.selectExplainId1 } })
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
    BidActionButton18() {
      this.$http.get("/BidActionButton/BidActionButton18", { params: { bidModelId: this.id } }).then((res) => {
        // if (res.data.success) {
        this.engineeringFileAuditButton = res.data.engineeringFileAuditButton;
        this.insideQusAuditButton = res.data.insideQusAuditButton;
        // }
      });
    },
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
    //   this.GetNewLogList_InsideQus(filid);
    // },
    delzheng(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoBidMaster/DelInisdeQs", { id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetQustionList();
          // this.GetQustionFileList();
        });
      });
    },
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
    // GetAuditButton02() {
    //   this.$http.get("/LiandoBidMaster/GetAuditButton02", { params: { bidModeId: this.id, masterId: this.selectExplainId1 } }).then(res => {
    //     // this.ideaRemark = res.data.ideaRemark;
    //     if (res.data.ideaRemark != "" || res.data.ideaRemark != null) {
    //       this.showhold = true;
    //       this.showholder = false;
    //       this.valuehold1 = res.data.ideaRemark;
    //     } else {
    //       this.showhold = false;
    //       this.showholder = true;
    //       this.valuehold2 = "请输入审批意见";
    //     }
    //     if (res.data.showPassButton) {
    //       this.showPassButton = true;
    //     } else {
    //       this.showPassButton = false;
    //     }
    //     if (res.data.showRefuseButton) {
    //       this.showRefuseButton = true;
    //     } else {
    //       this.showRefuseButton = false;
    //     }
    //     if (res.data.showRefuseButton == false && res.data.showPassButton == false) {
    //       this.showmark = false;
    //     } else {
    //       this.showmark = true;
    //     }
    //   });
    // },
    omsubmit(item) {
      if (!item.remark) {
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
            masterId: item.id,
            remark: item.remark,
            isOk: 0,
          };
          this.loadingneibu = true;
          this.$http.post("/WorkFlowStart/WF_Process_InsideQus_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingneibu = false;
              this.$msg.success("操作成功");
              this.GetQustionList();
            } else {
              this.loadingneibu = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    bohui(item) {
      if (!item.remark) {
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
            masterId: item.id,
            remark: item.remark,
            isOk: -1,
          };
          this.loadingneibu = true;
          this.$http.post("/WorkFlowStart/WF_Process_InsideQus_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingneibu = false;
              this.$msg.success("操作成功");
              this.GetQustionList();
            } else {
              this.loadingneibu = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    GetAuditButton03() {
      this.$http
        .get("/LiandoBidMaster/GetAuditButton03", { params: { bidModeId: this.id, masterId: this.selectExplainIdtwo } })
        .then((res) => {
          this.replaceButton = res.data.replaceButton;
          this.submitButton = res.data.submitButton;
          this.uploadButton = res.data.uploadButton;
          //   this.remark = res.data.ideaRemark;
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
    zhuanjiao() {
      this.type = 1;
      this.$refs.choseUser.openfnc();
    },
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
    onUploadPreview() {
      this.dialogVisiblegong = true;
      this.fileList = [];
      this.FileName = "";
    },
    getUploadUrl() {
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
    submitUploadgong() {
      Object.assign(this.uploadData);
      // console.log(this.planId);
      this.$refs.upload.submit();
    },
    beforeUploadgong(file) {
      let name = file.name;
      if (this.FileName == "") {
        let index = name.lastIndexOf("\.");
        this.FileName = name.substring(0, index);
      }
    },
    onUploadSuccessgong(response, file, fileList) {
      this.$message.success(response.message);
      this.GetProcessProgrammeFile();
      this.GetNewLogList_EngineeringFile();
      this.GetAuditButton03();
      this.dialogVisiblegong = false;
    },
    GetAuditButton04() {
      this.$http.get("/LiandoBidSupQs/GetAuditButton04", { params: { bidModeId: this.id, masterId: this.selectExplainId } }).then((res) => {
        // this.ideaRemarkwaibu = res.data.ideaRemark;
        if (res.data.ideaRemark != "" || res.data.ideaRemark != null) {
          this.showhold = true;
          this.showholder = false;
          this.valuehold1 = res.data.ideaRemark;
        } else {
          this.showhold = false;
          this.showholder = true;
          this.valuehold2 = "请输入审批意见";
        }
        if (res.data.showPassButton) {
          this.showPassButtonwaibu = true;
        } else {
          this.showPassButtonwaibu = false;
        }
        if (res.data.showRefuseButton) {
          this.showRefuseButtonwaibu = true;
        } else {
          this.showRefuseButtonwaibu = false;
        }
        if (res.data.showRefuseButton == false && res.data.showPassButton == false) {
          this.showmarkwaibu = false;
        } else {
          this.showmarkwaibu = true;
        }
      });
    },
    omsubmitwaibu(item) {
      if (!item.remark) {
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
            masterId: item.id,
            remark: item.remark,
            isOk: 0,
          };
          this.loadingwaibu = true;
          this.$http.post("/WorkFlowStart/WF_Process_SupQus_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingwaibu = false;
              this.$msg.success("操作成功");
              this.GetAnswerMaster001();
            } else {
              this.loadingwaibu = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    bohuiwaibu(item) {
      if (!item.remark) {
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
            masterId: item.id,
            remark: item.remark,
            isOk: -1,
          };
          this.loadingwaibu = true;
          this.$http.post("/WorkFlowStart/WF_Process_SupQus_Run", obj).then((res) => {
            if (res.data.status == 1) {
              this.loadingwaibu = false;
              this.$msg.success("操作成功");
              this.GetAnswerMaster001();
            } else {
              this.loadingwaibu = false;
              this.$alert(res.data.message, {
                confirmButtonText: "确定",
              });
            }
          });
        });
      }
    },
    onDelete(opt) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoBidMaster/DelProgrammeFile", { id: opt.id }).then((res) => {
          res.data.success ? this.$message.success(res.data.message) : this.$message.error(res.data.message);
          this.GetProcessProgrammeFile();
          this.GetNewLogList_EngineeringFile();
        });
      });
    },
    GetTechBusinessPercent() {
      this.$http.get("/LiandoBidMaster/GetTechBusinessPercent?bidModeId=" + this.id).then((res) => {
        this.userForm = res.data;
      });
    },
    //上传答疑文件
    upLoadDaYiFile() {
      this.dialogVisibleDaYiFile = true;
      this.loadingdayi = false;
      this.fileDaYiForm.remark == "";
      this.fileList = [];
      this.fileDaYiForm.file = [];
      this.file = [];
      this.$refs.uploadDaYiFile.clearFiles();
      // this.$nextTick(() => {
      //   this.$refs.fileDaYiForm.clearValidate(["file"]);
      // });
    },
    //获取答疑文件
    GetQustionList() {
      this.$http.get("/LiandoBidMaster/GetQustionList?bidModeId=" + this.id).then((res) => {
        res.data.dataList.forEach((e) => {
          e.remark = "";
        });
        this.daYiFileList = res.data.dataList;
        this.activeNamesneibu = res.data.dataList.map((v) => v.content);
        // this.selectExplainId1 = res.data.dataList.map(v => v.id).join();
        this.showUploadButton = res.data.showUploadButton;
      });
    },
    choseFile() {
      // if ((this.fileDaYiForm.file = [])) {
      //   this.$message.warning("请上传文件");
      // } else {
      if (this.fileDaYiForm.file.length > 0) {
        //上传成功钩子
        this.$nextTick(() => {
          this.$refs["fileDaYiForm"].clearValidate(["file"]); //取消该项校验
        });
      }
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
              }
            })
            .catch((err) => {
              this.loadingdayi = false;
              this.dialogVisibleDaYiFile = false;
              this.$alert(err.data.message, {
                confirmButtonText: "确定",
              });
            });
        }
      });
    },
    onDonwLoad(fileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidCommonFileDownLoad099?fileId=" + fileId);
    },
    cuiBan(id) {
      this.$http.post("/LiandoBidMaster/SendQustionToDo", { id }).then((res) => {
        res.data.success ? this.$msg.success(res.data.message) : this.$msg.error(res.data.message);
      });
    },
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
    GetProjectTempFile() {
      this.$http.get("/BidAttach/GetProjectTempFile", { params: { bidModeId: this.id } }).then((res) => {
        this.mubandata = [res.data[0]];
        this.filesId = res.data[0].id;
      });
    },
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
        this.sumitButton = res.data.sumitButton;
        console.log(this.showdataList);
      });
    },
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
    GetProgrammeFileList01() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/LiandoBidMaster/GetProgrammeFileList01", { params: obj }).then((res) => {
        this.gongchenglist = res.data.fileList;
        this.gongpressButton = res.data.pressButton;
        this.selectExplainIdtwo = res.data.fileList.length > 0 ? res.data.fileList[0].masterId : "";
        this.GetProcessProgrammeFile();
        this.GetAuditButton03();
      });
    },
    GetProcessProgrammeFile() {
      let obj = {
        bidModeId: this.id,
        masterId: this.selectExplainIdtwo,
      };
      this.$http.get("/LiandoBidMaster/GetProgrammeFileList", { params: obj }).then((res) => {
        this.fildata = res.data;
      });
    },
    look(type) {
      this.$router.push({
        name: "info",
        query: {
          bidModeId: this.id,
          type: type,
        },
      });
    },
    GetQsStatus() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/LiandoBidSupQs/GetQsStatus", { params: obj }).then((res) => {
        this.warnTitle = res.data.message;
        if (res.data.success) {
          this.isShowBtn = true;
        } else {
          this.isShowBtn = false;
        }
        this.GetAnswerMaster001();
      });
    },
    GetSupQuestionList_Supplier() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/LiandoBidSupQs/GetSupQuestionList_Supplier", { params: obj }).then((res) => {
        this.dataList1 = res.data;
      });
    },

    GetAnswerMaster001() {
      let obj = {
        bidModeId: this.id,
      };
      this.dialogVisible1 = false;
      this.$http.get("/LiandoBidSupQs/GetAnswerMaster001", { params: obj }).then((res) => {
        res.data.forEach((e) => {
          e.remark = "";
        });
        this.dataList2 = res.data;
        this.activeNames = res.data.map((v) => v.answerName);
        this.selectExplainId = res.data.map((v) => v.id).join();
        // this.selectExplainId = res.data.length > 0 ? res.data[0].id : "";
        if (res.data.length > 0) {
          this.GetAnswerShowDetailList002();
          this.GetNewLogList_SupQus();
          this.GetAuditButton04();
        }
      });
    },
    GetAnswerShowDetailList002() {
      let obj = {
        answerId: this.selectExplainId,
      };
      this.dialogVisible1 = false;
      this.$http.get("/LiandoBidSupQs/GetAnswerShowDetailList002", { params: obj }).then((res) => {
        this.tableListwaibu = res.data;
        // this.supplierNameList = res.data.supplierNameList;
        console.log(this.supplierNameList);
      });
      this.GetNewLogList_SupQus();
    },
    GetNewLogList_SupQus(row) {
      this.$http
        .get("/WorkFlowStart/GetNewLogList_SupQus", { params: { bidModeId: this.id, masterId: this.selectExplainId } })
        .then((res) => {
          // if (res.data.logs.length > 0) {
          this.tableshenpiwaibu = res.data.logs;
          this.status = res.data.status;
          if (res.data.logs.length > 0 || res.data.logs == null) {
            this.tableif = true;
          } else {
            this.tableif = false;
          }
          // }
        });
    },
    GetBidWinPageShow() {
      let obj = {
        bidModeId: this.id,
      };
      this.$http.get("/LiandoBidSupQs/GetSupplierInList", { params: obj }).then((res) => {
        this.dataList = res.data;
      });
    },
    addDyi() {
      this.tit = "新增";
      this.GetBidWinPageShow();
      this.dialogVisible1 = true;
      this.fileList = [];
      this.newData.file = [];
      this.file = [];
      this.newForm.supplierIds = [];
      this.newForm.answerName = "";
      this.$nextTick(() => {
        this.$refs["newData"].resetFields();
        this.$refs.upload.clearFiles();
      });
    },
    downLoad(id, i) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad009?fileId=" + id);
    },
    del(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/LiandoBidSupQs/DelAnswer", { id }).then((res) => {
          if (res.data.success) {
            this.GetAnswerMaster001();
            this.$message.success(res.data.message);
            this.GetAnswerShowDetailList002();
          } else {
            this.$message.warning(res.data.message);
          }
        });
      });
    },
    sub(id) {
      this.$confirm("确定要提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.subloading = true;
        this.$http.post("/LiandoBidSupQs/SubmitAnswer", { id }).then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.message);
            this.subloading = false;
            this.GetAnswerMaster001();
          } else {
            this.$message.warning(res.data.message);
            this.subloading = false;
          }
        });
      });
    },
    newForm() {
      if (this.newData.file.length > 0) {
        //上传成功钩子
        this.$nextTick(() => {
          this.$refs["newData"].clearValidate(["file"]); //取消该项校验
        });
      }
      this.$refs["newData"].validate((valid) => {
        if (valid) {
          this.loading2 = true;
          let upData = new FormData();
          this.$refs.upload.submit(); // 这里是执行文件上传的函数，其实也就是获取我们要上传的文件
          this.file.forEach((file) => {
            // 因为要上传多个文件，所以需要遍历
            upData.append("file", file, file.name);
            // upData.append('file', this.file); //不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
          });
          upData.append("BidModeId", this.id); // 这里需要转换一下格式传给后台
          upData.append("SupplierIds", this.newData.supplierIds); // 这里需要转换一下格式传给后台
          upData.append("AnswerName", this.newData.answerName); // 这里需要转换一下格式传给后台
          this.$axios.post("/api/FileUpload/UploadAnswerFileList", upData).then((res) => {
            if (res.data.success) {
              this.loading2 = false;
              this.$message.success("上传成功");
              this.$refs.upload.clearFiles();
              this.dialogVisible1 = false;
              this.newData.supplierIds = "";
              this.newData.answerName = "";
              this.newData.file = [];
              this.fiel = [];
              this.GetQsStatus();
            } else {
              this.$message.warning("上传成功");
            }
          });
        }
      });
    },
    GetExplainDetailList32(row) {
      this.GetAnswerShowDetailList002();
      this.GetAuditButton04();
    },
    getUploadUrl1() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidProcessAttach1";
    },
    getUploadUrl2() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidProcessAttach2";
    },
    getUploadUrl4() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/BidImportExamItem";
    },
    GetBidMasterPageShow() {
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
        that.isBidUser = info.isBidUser;
        this.showSavePercentButton = res.data.showSavePercentButton;
        console.log(res.data.showSavePercentButton);
        console.log(res.data.showSubmitButton);
        this.GetBidFileTempList();
        this.GetBidOtherFileList();
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
    GetbidFileRole() {
      this.$http.get("/LiandoBidMaster/GetbidFileRole", { params: { bidModeId: this.id } }).then((res) => {
        if (res.data.success) {
          this.tobut = true;
        } else {
          this.tobut = false;
        }
      });
    },
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
    // 其他附件的接口
    GetBidOtherFileList() {
      this.$http.get("/BidAttach/GetBidOtherFileList", { params: { baseId: this.id } }).then((res) => {
        this.optionList1 = res.data;
      });
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
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    uploadFile(file) {
      // this.file.push(file.file); // append增加数据
    },
    handleChange1(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = fileList;
      }
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
    pubExportdata(url, obj, name) {
      this.$axios.post(url, obj).then((response) => {
        console.log(response);
        // 提取文件名
        // const fileName = row.fileName // + row.fileExtName      .response.headers['content-disposition'].match(/filename=(.*)/)[1]
        let fileName = name + new Date().toLocaleDateString();
        // console.log(fileName)
        // 将二进制流转为blob
        const blob = new Blob([response.data], { type: response.headers["content-type"] });
        if (typeof window.navigator.msSaveBlob !== "undefined") {
          // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
          window.navigator.msSaveBlob(blob, decodeURI(fileName));
        } else {
          // 创建新的URL并指向File对象或者Blob对象的地址
          const blobURL = window.URL.createObjectURL(blob);
          // 创建a标签，用于跳转至下载链接
          const tempLink = document.createElement("a");
          tempLink.style.display = "none";
          tempLink.href = blobURL;
          tempLink.setAttribute("download", decodeURI(fileName));
          // 兼容：某些浏览器不支持HTML5的download属性
          if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
          }
          // 挂载a标签
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
          // 释放blob URL地址
          window.URL.revokeObjectURL(blobURL);
        }
      });
    },
    // 相关附件下载
    download(fileId) {
      window.open(process.env.VUE_APP_API_URL + "/api/FileDownLoad/BidFileDownLoad004?fileId=" + fileId);
      // window.location.href = process.env.VUE_APP_API_URL + url;
    },
    onEditSave() {
      this.dialogVisible = false;
      this.GetBidMasterPageShow();
      this.$emit("GetBidMasterPageShow");
    },
    onCancle() {
      this.dialogVisible1 = false;
      this.$refs["form"].clearValidate();
    },
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
