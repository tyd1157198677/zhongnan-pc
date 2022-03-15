<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:99%;" id="content1">
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <th style="text-align:center;">供应商考察报告</th>
        </tr>
        <tr>
          <th>考察主题信息</th>
        </tr>
      </tbody>
    </table>
    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <td class="right">考察分类：</td>
          <td>{{ form.supCateName }}</td>
          <td class="right">考察主题：</td>
          <td>{{ form.masterName }}</td>
        </tr>
        <tr>
          <td class="right">考察目的：</td>
          <td>{{ form.invesReason }}</td>
          <td class="right">适用范围：</td>
          <td>{{ form.scope }}</td>
        </tr>
        <tr>
          <td class="right">考察打分模版：</td>
          <td>{{ form.tempName }}</td>
          <td class="right">考察报告类型：</td>
          <td>{{ form.reportType }}</td>
        </tr>
        <tr>
          <td class="right">考察报告编辑人：</td>
          <td>{{ form.editUserName }}</td>
          <td class="right">招标项目名称：</td>
          <td>{{ form.bidProjectName }}</td>
        </tr>
        <tr>
          <td class="right">考察开始日期：</td>
          <td>{{ form.startDate }}</td>
          <td class="right">考察结束日期：</td>
          <td>{{ form.endDate }}</td>
        </tr>
      </tbody>
    </table>

    <table class="layui-table el-table__body" v-if="this.dropDownGroup.moduleName1">
      <tbody>
        <tr>
          <th>{{ this.dropDownGroup.moduleName1 }}</th>
        </tr>
      </tbody>
    </table>
    <table class="layui-table el-table__body" v-if="this.dropDownGroup.moduleName1">
      <tbody>
        <tr v-for="(item, index) in data1" :key="item.id">
          <td class="right">{{ item.cateName }}：</td>
          <td>{{ item.cateValue }}</td>
          <td class="right" v-if="index + 1 < data1.length">{{ data1[index + 1].cateName }}：</td>
          <td v-if="index + 1 < data1.length">{{ data1[index + 1].cateValue }}</td>
        </tr>
      </tbody>
    </table>

    <table class="layui-table el-table__body" v-if="this.dropDownGroup.moduleName2">
      <tbody>
        <tr>
          <th>{{ this.dropDownGroup.moduleName2 }}</th>
        </tr>
      </tbody>
    </table>
    <table class="layui-table el-table__body" v-if="this.dropDownGroup.moduleName2">
      <tbody>
        <tr v-for="(item, index) in data2" :key="item.id">
          <td class="right">{{ item.cateName }}：</td>
          <td>{{ item.cateValue }}</td>
          <td class="right" v-if="index + 1 < data2.length">{{ data2[index + 1].cateName }}：</td>
          <td v-if="index + 1 < data2.length">{{ data2[index + 1].cateValue }}</td>
        </tr>
      </tbody>
    </table>

    <table class="layui-table el-table__body" v-if="this.dropDownGroup.moduleName3">
      <tbody>
        <tr>
          <th>{{ this.dropDownGroup.moduleName3 }}</th>
        </tr>
      </tbody>
    </table>
    <table class="layui-table el-table__body" v-if="this.dropDownGroup.moduleName3">
      <tbody>
        <tr v-for="(item, index) in data3" :key="item.id">
          <td class="right">{{ item.cateName }}：</td>
          <td>{{ item.cateValue }}</td>
          <td class="right" v-if="index + 1 < data3.length">{{ data3[index + 1].cateName }}：</td>
          <td v-if="index + 1 < data3.length">{{ data3[index + 1].cateValue }}</td>
        </tr>
      </tbody>
    </table>

    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <th>业绩复核</th>
        </tr>
      </tbody>
    </table>
    <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData" v-loading="loading">
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column prop="conName" label="业绩合同名称" align="center"></el-table-column>
      <el-table-column prop="conValue" label="合同金额(单位：万元)" align="center"> </el-table-column>
      <el-table-column prop="cooperName" label="合作企业名称" align="center"> </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
    </el-table>

    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <th>考察照片</th>
        </tr>
      </tbody>
    </table>
    <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData2" v-loading="loading">
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column label="照片" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="'http://bidserver.hrdservice.com' + scope.row.filePath + scope.row.fileReName"
            :preview-src-list="srcList"
          >
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="attachDesc" label="照片说明" align="center"> </el-table-column>
    </el-table>

    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <th>资质评估结果</th>
        </tr>
      </tbody>
    </table>
    <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData3" v-loading="loading">
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column prop="zbName" label="考察方式" align="center"></el-table-column>
      <el-table-column prop="standard" label="资质评估参考标准" align="center"> </el-table-column>
      <el-table-column prop="passFlag" label="评估结果" align="center"> </el-table-column>
    </el-table>

    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <th>
            考察打分结果<i v-if="this.dropDownGroup.finalScore">（最终得分：{{ this.dropDownGroup.finalScore }}）</i>
          </th>
        </tr>
      </tbody>
    </table>
    <!--<div class="table-top-title" style="margin-bottom: 10px"><i>{{this.dropDownGroup.scoreMessage}}</i> <i style="float: right" v-if="this.dropDownGroup.finalScore">最终得分：{{this.dropDownGroup.finalScore}}</i></div>-->
    <el-table
      empty-text="暂无数据"
      stripe
      border
      element-loading-text="请稍候,数据正在加载中..."
      :data="tableData4"
      v-loading="loading"
      height="400"
    >
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column prop="standard" label="打分项" show-overflow-tooltip>
        <template slot-scope="scope">
          <strong>{{ scope.row.wdName }}-{{ scope.row.zbName }}</strong>
          <br />
          <span>{{ scope.row.standard }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fullScore" label="满分" align="center" width="80"></el-table-column>
      <el-table-column
        width="120"
        :key="index"
        :prop="'index' + index"
        :label="item.depName"
        align="center"
        v-for="(item, index) in tableData6"
      ></el-table-column>
      <el-table-column prop="avgScore" label="汇总得分" align="center" width="80"> </el-table-column>
    </el-table>

    <table class="layui-table el-table__body">
      <tbody>
        <tr>
          <th>考察人员打分信息</th>
        </tr>
      </tbody>
    </table>
    <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData5" v-loading="loading">
      <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
      <el-table-column prop="personName" label="姓名" align="center">
        <!--<template slot-scope="scope">-->
        <!--<div v-if="scope.row.isCompleted">-->
        <!--&lt;!&ndash;<i class="el-icon-search"></i>&ndash;&gt;-->
        <!--<el-link type="primary" style="margin-left: 10px" @click="jumpSuppInfo(scope.row)">{{ scope.row.personName }}</el-link><i class="el-icon-search"></i>-->
        <!--</div>-->
        <!--<i v-if="!scope.row.isCompleted">{{scope.row.personName}}</i>-->
        <!--</template>-->
      </el-table-column>
      <el-table-column prop="depName" label="考察部门" align="center"> </el-table-column>
      <el-table-column prop="isCompleted" label="考察状态" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.isCompleted">已打分</i>
          <i v-if="!scope.row.isCompleted">未打分</i>
        </template>
      </el-table-column>
      <el-table-column prop="fullScore" label="满分" align="center"> </el-table-column>
      <el-table-column prop="giveScore" label="得分" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.isCompleted">
            <!--<i class="el-icon-search"></i>-->
            <el-link type="primary" style="margin-left: 10px" @click="jumpSuppInfo(scope.row)">{{ scope.row.giveScore }}</el-link>
          </div>
          <i v-if="!scope.row.isCompleted">-</i>
        </template></el-table-column
      >
      <el-table-column prop="percent" label="比例" align="center">
        <template slot-scope="scope">{{ scope.row.percent }}%</template>
      </el-table-column>
    </el-table>

    <!--<el-tab-pane label="提交考察结果" name="提交考察结果">-->
    <!--<div class="table-top-title" style="margin-bottom: 10px" v-if="this.dropDownGroup.submitTabMessage">提醒：<i>{{this.dropDownGroup.submitTabMessage}}</i></div>-->
    <!--<el-form ref="form" :inline="true" label-width="130px" :model="form" class="m-3">-->
    <!--<el-row>-->
    <!--<el-form-item label="总体情况" prop="passFlag">-->
    <!--<el-select v-model="form.passFlag">-->
    <!--<el-option label="通过" value=true></el-option>-->
    <!--<el-option label="未通过" value=false></el-option>-->
    <!--</el-select>-->
    <!--</el-form-item>-->
    <!--</el-row>-->
    <!--<el-row>-->
    <!--<el-form-item label="说明" prop="resultDesc">-->
    <!--<el-input v-model="form.resultDesc" style="width:650px;"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-row>-->
    <!--<el-button type="primary" size="small" @click="SaveSupplierResult" style="float: right;" v-if="this.dropDownGroup.canSubmitReport">提交考察结果</el-button>-->
    <!--</el-form>-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="考察主题信息" name="考察主题信息">-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="考察主题信息" name="考察主题信息">-->
    <!--</el-tab-pane>-->
    <!--</el-tabs>-->

    <!--<el-row class="pt-3 pl-3 pr-3 mx-auto mh" v-if="this.dropDownGroup.moduleName1">-->
    <!--<div class="table-top-title">{{this.dropDownGroup.moduleName1}}</div>-->
    <!--<el-form-->
    <!--ref="form11"-->
    <!--:inline="true"-->
    <!--label-width="200px"-->
    <!--:model="form11"-->
    <!--:rules="rules"-->
    <!--class="m-3">-->
    <!--<el-row v-for="(item,index) in data1" :key="item.id" v-if="index%2==0">-->
    <!--<el-form-item :label="item.cateName" prop="cateName">-->
    <!--<el-input v-model="item.cateValue"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="data1[index+1].cateName" v-if="index+1 < data1.length" prop="cateName">-->
    <!--<el-input v-model="data1[index+1].cateValue"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-row>-->
    <!--<el-button type="primary" size="small" @click="saveForm1" style="float: right;margin-top: 10px;">保存</el-button>-->
    <!--</el-form>-->
    <!--</el-row>-->

    <!--<el-row class="pt-3 pl-3 pr-3 mx-auto mh" v-if="this.dropDownGroup.moduleName2">-->
    <!--<div class="table-top-title">{{this.dropDownGroup.moduleName2}}</div>-->
    <!--<el-form-->
    <!--ref="form12"-->
    <!--:inline="true"-->
    <!--label-width="200px"-->
    <!--:model="form12"-->
    <!--:rules="rules"-->
    <!--class="m-3">-->
    <!--<el-row v-for="(item,index) in data2" :key="item.id" v-if="index%2==0">-->
    <!--<el-form-item :label="item.cateName" prop="cateName">-->
    <!--<el-input v-model="item.cateValue"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="data2[index+1].cateName" v-if="index+1 < data2.length" prop="cateName">-->
    <!--<el-input v-model="data2[index+1].cateValue"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-row>-->
    <!--<el-button type="primary" size="small" @click="saveForm2" style="float: right;margin-top: 10px;">保存</el-button>-->
    <!--</el-form>-->
    <!--</el-row>-->

    <!--<el-row class="pt-3 pl-3 pr-3 mx-auto mh" v-if="this.dropDownGroup.moduleName3">-->
    <!--<div class="table-top-title">{{this.dropDownGroup.moduleName3}}</div>-->
    <!--<el-form-->
    <!--ref="form13"-->
    <!--:inline="true"-->
    <!--label-width="200px"-->
    <!--:model="form13"-->
    <!--:rules="rules"-->
    <!--class="m-3">-->
    <!--<el-row v-for="(item,index) in data3" :key="item.id" v-if="index%2==0">-->
    <!--<el-form-item :label="item.cateName" prop="cateName">-->
    <!--<el-input v-model="item.cateValue"></el-input>-->
    <!--</el-form-item>-->
    <!--<el-form-item :label="data3[index+1].cateName" v-if="index+1 < data3.length" prop="cateName">-->
    <!--<el-input v-model="data3[index+1].cateValue"></el-input>-->
    <!--</el-form-item>-->
    <!--</el-row>-->
    <!--<el-button type="primary" size="small" @click="saveForm3" style="float: right;margin-top: 10px;">保存</el-button>-->
    <!--</el-form>-->
    <!--</el-row>-->

    <!--<el-row class="pt-3 pl-3 pr-3 mx-auto mh">-->
    <!--<div class="table-top-title" style="margin-bottom: 5px">业绩复核</div>-->
    <!--<i class="el-icon-circle-plus" @click="add1" style="float: right;margin-bottom: 5px"></i>-->
    <!--<el-table-->
    <!--empty-text="暂无数据"-->
    <!--stripe-->
    <!--border-->
    <!--element-loading-text="请稍候,数据正在加载中..."-->
    <!--:data="tableData"-->
    <!--v-loading="loading"-->
    <!--&gt;-->
    <!--<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>-->
    <!--<el-table-column prop="conName" label="业绩合同名称" align="center"></el-table-column>-->
    <!--<el-table-column prop="conValue" label="合同金额(单位：万元)" align="center"> </el-table-column>-->
    <!--<el-table-column prop="cooperName" label="合作企业名称" align="center"> </el-table-column>-->
    <!--<el-table-column prop="remark" label="备注" align="center"> </el-table-column>-->
    <!--<el-table-column label="操作" align="center">-->
    <!--<template slot-scope="scope">-->
    <!--<i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
    <!--<i @click="edit1(scope.row)" class="el-icon-edit" title="修改" style="margin-left:5px" />-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</el-row>-->

    <!--<el-row class="pt-3 pl-3 pr-3 mx-auto mh">-->
    <!--<div class="table-top-title" style="margin-bottom: 5px">考察照片</div>-->
    <!--<i class="el-icon-circle-plus" @click="add2" style="float: right;margin-bottom: 5px"></i>-->
    <!--<el-table-->
    <!--empty-text="暂无数据"-->
    <!--stripe-->
    <!--border-->
    <!--element-loading-text="请稍候,数据正在加载中..."-->
    <!--:data="tableData2"-->
    <!--v-loading="loading"-->
    <!--&gt;-->
    <!--<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>-->
    <!--<el-table-column label="照片" align="center">-->
    <!--<template slot-scope="scope">-->
    <!--<el-image style="width: 50px; height: 50px" :src="'http://bidserver.hrdservice.com'+scope.row.filePath+scope.row.fileReName" :preview-src-list="srcList">-->
    <!--</el-image>-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--<el-table-column prop="attachDesc" label="照片说明" align="center"> </el-table-column>-->
    <!--<el-table-column label="操作" align="center">-->
    <!--<template slot-scope="scope">-->
    <!--<i @click="delete2(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />-->
    <!--</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</el-row>-->

    <!--<el-row class="pt-3 pl-3 pr-3 mx-auto mh">-->
    <!--<div class="table-top-title" style="margin-bottom: 10px">资质评估结果</div>-->
    <!--<el-table-->
    <!--empty-text="暂无数据"-->
    <!--stripe-->
    <!--border-->
    <!--element-loading-text="请稍候,数据正在加载中..."-->
    <!--:data="tableData3"-->
    <!--v-loading="loading"-->
    <!--&gt;-->
    <!--<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>-->
    <!--<el-table-column prop="zbName" label="考察方式" align="center"></el-table-column>-->
    <!--<el-table-column prop="standard" label="资质评估参考标准" align="center"> </el-table-column>-->
    <!--<el-table-column prop="passFlag" label="评估结果" align="center"> </el-table-column>-->
    <!--</el-table>-->
    <!--</el-row>-->

    <!--<el-row class="pt-3 pl-3 pr-3 mx-auto mh">-->
    <!--<div class="table-top-title" style="margin-bottom: 10px">考察打分结果</div>-->
    <!--<el-table-->
    <!--empty-text="暂无数据"-->
    <!--stripe-->
    <!--border-->
    <!--element-loading-text="请稍候,数据正在加载中..."-->
    <!--:data="tableData4"-->
    <!--v-loading="loading"-->
    <!--&gt;-->
    <!--<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>-->
    <!--<el-table-column prop="standard" label="打分项" align="center"></el-table-column>-->
    <!--<el-table-column prop="fullScore" label="满分" align="center" width="80"></el-table-column>-->
    <!--<el-table-column width="120" :prop="'index'+index" :label="item.depName" align="center" v-for="(item,index) in tableData6"></el-table-column>-->
    <!--<el-table-column prop="avgScore" label="汇总得分" align="center" width="80"> </el-table-column>-->
    <!--</el-table>-->
    <!--</el-row>-->

    <!--<el-row class="pt-3 pl-3 pr-3 mx-auto mh">-->
    <!--<div class="table-top-title" style="margin-bottom: 10px">考察人员打分信息</div>-->
    <!--<el-table-->
    <!--empty-text="暂无数据"-->
    <!--stripe-->
    <!--border-->
    <!--element-loading-text="请稍候,数据正在加载中..."-->
    <!--:data="tableData5"-->
    <!--v-loading="loading"-->
    <!--&gt;-->
    <!--<el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>-->
    <!--<el-table-column prop="personName" label="姓名" align="center"></el-table-column>-->
    <!--<el-table-column prop="depName" label="考察部门" align="center"> </el-table-column>-->
    <!--<el-table-column prop="fullScore" label="满分" align="center"> </el-table-column>-->
    <!--<el-table-column prop="giveScore" label="得分" align="center"> </el-table-column>-->
    <!--<el-table-column prop="percent" label="比例" align="center">-->
    <!--<template slot-scope="scope">{{scope.row.percent}}%</template>-->
    <!--</el-table-column>-->
    <!--</el-table>-->
    <!--</el-row>-->

    <el-divider></el-divider>

    <el-dialog :visible.sync="flag" title="编辑业绩" width="70%">
      <el-form ref="form2" :inline="true" label-width="140px" :model="form2" class="m-3">
        <el-row>
          <el-form-item label="合同名称:" prop="conName">
            <el-input v-model="form2.conName"></el-input>
          </el-form-item>
          <el-form-item label="合同金额（万元）:" prop="conValue">
            <el-input v-model="form2.conValue" maxlength="10"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="合作企业名称:" prop="cooperName">
            <el-input v-model="form2.cooperName"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="form2.remark"></el-input>
          </el-form-item>
          <el-button type="primary" size="small" @click="save1" style="float: right;margin-top: 10px;">保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="flag" title="编辑业绩" width="70%">
      <el-form ref="form2" :inline="true" label-width="140px" :model="form2" class="m-3">
        <el-row>
          <el-form-item label="合同名称:" prop="conName">
            <el-input v-model="form2.conName"></el-input>
          </el-form-item>
          <el-form-item label="合同金额（万元）:" prop="conValue">
            <el-input v-model="form2.conValue" maxlength="10"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="合作企业名称:" prop="cooperName">
            <el-input v-model="form2.cooperName"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="form2.remark"></el-input>
          </el-form-item>
          <el-button type="primary" size="small" @click="save1" style="float: right;margin-top: 10px;">保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="flag2" title="上传图片" width="50%">
      <el-form ref="form3" :inline="true" label-width="100px" :model="form3" class="m-3">
        <el-row>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://bidserver.hrdservice.com/api/FileUpload/InvesFile1"
       
            :on-change="beforeUpload"
            :before-remove="beforeRemove"
            :file-list="fileList"
            :auto-upload="false"
            :headers="header"
            :http-request="save2"
          >
            <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
          </el-upload>
        </el-row>
        <el-row>
          <el-form-item label="图片描述：" prop="AttachDesc">
            <el-input type="text" v-model="AttachDesc"></el-input>
          </el-form-item>
          <el-button type="primary" size="small" @click="save2" style="float: right;" v-loading="loading">保存</el-button>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="flag3" title="打分明细" width="70%">
      <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData10" v-loading="loading">
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="standard" label="评审项">
          <template slot-scope="scope">
            <span :title="scope.row.standard">
              <strong>{{ scope.row.wdName }}-{{ scope.row.zbName }}</strong>
              <br />
              <span>{{ scope.row.standard }}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="fullScore" label="满分" align="center" width="80"></el-table-column>
        <el-table-column prop="giveScore" label="得分" align="center" width="80"> </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      activeName: "考察主题信息",
      srcList: [],
      fileList: [],
      flag: false,
      flag2: false,
      flag3: false,
      data1: "",
      data2: "",
      data3: "",
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5: [
        {
          personId : "",
        }
      ],
      tableData6: [],
      tableData10: [
         {
          personId : "",
        }
      ],
      showFlag: false,
      dropDownGroup: {},
      form: {
        passFlag: null,
        resultDesc: "",
      },
      supplierId: "",
      form2: {
        id: 0,
        masterId: "",
        supGuid: "",
        conName: "",
        conValue: 0,
        cooperName: "",
        remark: "",
      },
      form3: {},
      AttachDesc: "",
      file: {},
      form11: {
        cateName: "",
      },
      header: { Authorization: "Bearer " + this.$store.state.token },
    };
  },
  created() {
    var box = document.getElementById("page_footer");
    box.remove();
    var box2 = document.getElementById("head1");
    box2.remove();

    //this.supplierId = this.$route.query.supGuid

    // this.supplierId = this.dropDownGroup.supplierList[0].value;
    // this.change1();
    this.init();
  },
  methods: {
    init() {
      this.supplierId = this.$route.query.supGuid;

      var masterId = this.$route.query.masterId;
      this.$api.invest.GetReportMainForEdit({ masterId: masterId, supplierId: this.supplierId }).then(res => {
        this.dropDownGroup = res;
        this.data1 = res.moduleFormList1;
        this.data2 = res.moduleFormList2;
        this.data3 = res.moduleFormList3;

        this.getCaseInfo();
        this.getPic();
        this.resutl1();
        this.resutl2();
        this.resutl3();
      });
      //this.getData()

      this.$api.invest.GetInvesMasterList({ id: this.$route.query.masterId }).then(res => {
        this.form = res.items[0];
      });
    },
    SaveSupplierResult() {
      this.$confirm("确认提交考察结果吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest
            .SaveSupplierResult({
              masterId: this.$route.query.masterId,
              supGuid: this.supplierId,
              passFlag: this.form.passFlag,
              resultDesc: this.form.resultDesc,
            })
            .then(res => {
              if (res.success) {
                this.$message.success(res.message);
                this.init();
              } else {
                this.$message.error(res.message);
              }
            });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消" });
        });
    },
    jumpSuppInfo(row) {
      console.log(row);
      this.flag3 = true;
      this.$http.get("/InvesScoreResult/GetPersonSupplierResult", { params: { personId: row.personId, supGuid: this.supplierId } }).then(res => {
      // this.$api.InvesScoreResult.GetPersonSupplierResult({ personId: row.personId, supGuid: this.supplierId }).then(res => {
        this.tableData10 = res;
        console.log(row.personId);
      });
    },
    change1() {
      this.getData();
      this.getCaseInfo();
      this.getPic();
      this.resutl1();
      this.resutl2();
      this.resutl3();
      this.form.passFlag = null;
      this.form.resultDesc = "";
    },
    resutl1() {
      this.$api.invest.GetSupplierZzResult({ masterId: this.$route.query.masterId, supGuid: this.supplierId }).then(res => {
        this.tableData3 = res;
      });
    },
    resutl2() {
      this.$api.invest.GetSupplierScoreResult({ masterId: this.$route.query.masterId, supGuid: this.supplierId }).then(res => {
        this.tableData4 = res.scoreItem;
        this.tableData6 = res.departmentResult;
        for (var i = 0; i < this.tableData4.length; i++) {
          for (var j = 0; j < this.tableData6.length; j++) {
            var depAvgScore = this.tableData6[j].depAvgScore;
            this.$set(this.tableData4[i], "index" + j, depAvgScore[i]);
          }
        }
      });
    },
    resutl3() {
      this.$api.invest.GetPersonScoreStat({ masterId: this.$route.query.masterId, supGuid: this.supplierId }).then(res => {
        this.tableData5 = res;
      });
    },
    saveForm1() {
      for (var i = 0; i < this.data1.length; i++) {
        this.data1[i].cateId = this.data1[i].id;
      }
      this.$api.invest
        .SaveModuleForm({ masterId: this.$route.query.masterId, supplierId: this.supplierId, formValues: this.data1 })
        .then(res => {
          if (res.success) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        });
    },
    saveForm2() {
      for (var i = 0; i < this.data2.length; i++) {
        this.data2[i].cateId = this.data2[i].id;
      }
      this.$api.invest
        .SaveModuleForm({ masterId: this.$route.query.masterId, supplierId: this.supplierId, formValues: this.data2 })
        .then(res => {
          if (res.success) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        });
    },
    saveForm3() {
      for (var i = 0; i < this.data3.length; i++) {
        this.data3[i].cateId = this.data3[i].id;
      }
      this.$api.invest
        .SaveModuleForm({ masterId: this.$route.query.masterId, supplierId: this.supplierId, formValues: this.data3 })
        .then(res => {
          if (res.success) {
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        });
    },
    beforeRemove(file, fileList) {
      console.log(file);
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file) {
      this.file = file;
    },
    delete2(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.DeleteInvesImage({ id: id }).then(res => {
            if (res.success) {
              this.$message.success(res.message);
              this.getPic();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消" });
        });
    },
    add2() {
      this.flag2 = true;
    },
    save2(content) {
      this.loading = true;
      let f = new FormData();
      f.append("MasterId", this.$route.query.masterId);
      f.append("SupGuid", this.supplierId);
      f.append("AttachDesc", this.AttachDesc);
      f.append("fileBix", this.file.raw);
      this.form2.supGuid = this.supplierId;
      this.$api.invest.InvesFile1(f).then(res => {
        this.loading = false;
        if (res.success) {
          this.$refs.upload.clearFiles();
          this.$message.success(res.message);
          this.flag2 = false;
          this.getPic();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getPic() {
      this.$api.invest.GetInvesAttachList({ MasterId: this.$route.query.masterId, SupGuid: this.supplierId }).then(res => {
        console.log(res);
        this.tableData2 = res;
        for (var i = 0; i < res.length; i++) {
          this.srcList.push("http://bidserver.hrdservice.com" + res[i].filePath + res[i].fileReName);
        }
      });
    },
    delete1(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.DeleteInvesCaseInfoById({ id: id }).then(res => {
            if (res.success) {
              this.$message.success(res.message);
              this.getCaseInfo();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消" });
        });
    },
    add1() {
      this.flag = true;
    },
    edit1(row) {
      this.flag = true;
      this.form2 = row;
    },
    save1() {
      this.form2.masterId = this.$route.query.masterId;
      this.form2.supGuid = this.supplierId;
      this.$api.invest.SaveInvesCaseInfo(this.form2).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.flag = false;
          this.form2.id = 0;
          this.form2.conName = "";
          this.form2.conValue = 0;
          this.form2.cooperName = "";
          this.form2.remark = "";
          this.getCaseInfo();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getCaseInfo() {
      this.$api.invest.GetInvesCateInfoList({ masterId: this.$route.query.masterId, supGuid: this.supplierId }).then(res => {
        this.tableData = res;
      });
    },
    getData() {
      var masterId = this.$route.query.masterId;
      this.$api.invest.GetReportMainForEdit({ masterId: masterId, supplierId: this.supplierId }).then(res => {
        this.dropDownGroup = res;
        this.data1 = res.moduleFormList1;
        this.data2 = res.moduleFormList2;
        this.data3 = res.moduleFormList3;
      });
    },
    tiJiao() {
      var t = [];
      for (var i = 0; i < this.tableData.length; i++) {
        if (!this.tableData[i].giveScore) {
          this.$message.error("请把打分项填完");
          return;
        }
        if (parseInt(this.tableData[i].giveScore) > parseInt(this.tableData[i].fullScore)) {
          this.$message.error("不能比满分大");
          return;
        }
        var j = {};
        j.id = this.tableData[i].itemId;
        j.itemId = this.tableData[i].itemId;
        j.scoreDesc = "";
        j.giveScore = parseInt(this.tableData[i].giveScore);
        t.push(j);
      }
      this.$confirm("请确认打分项都填了并提交吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest
            .SavePersonScoreAndZzScore({
              personId: this.$route.query.personId,
              supplierId: this.form.supplierId,
              scoreItemList: t,
              remark: this.form.remark,
            })
            .then(res => {
              if (res.success) {
                this.$message.success(res.message);
              } else {
                this.$message.error(res.message);
              }
            });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消" });
        });
    },
  },
};
</script>

<style scoped>
.el-select,
.el-input {
  width: 16rem;
}

.el-form-item {
  margin-bottom: 10px;
}
</style>
