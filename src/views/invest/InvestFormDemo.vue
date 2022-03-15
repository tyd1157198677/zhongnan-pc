<template>
  <div style="margin:0px auto 10px;margin-bottom: 65px;width:90%;">
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">1.供应商基本信息</div>
      <el-form ref="form" :inline="true" label-width="130px" :model="form" :rules="rules" class="m-3">
        <el-row>
          <el-col :span="8">
            <el-form-item label="单位名称：">
              <el-select v-model="form.masterName">
                <el-option label="北京汇睿达科技有限公司" value="北京汇睿达科技有限公司"></el-option>
                <el-option label="深圳市广胜达建设有限公司" value="深圳市广胜达建设有限公司"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
                  <el-form-item label="承接主体名称" prop="masterName">
                    <el-input v-model="form.masterName"></el-input>
                  </el-form-item>
                </el-col> -->
          <el-col :span="8">
            <el-form-item label="注册地址" prop="scope">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册资金" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                       <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办公地址" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                      <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="渠道来源" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                      <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="资质等级" prop="invesReason">
              <el-select v-model="form.invesReason" @change="onSelectedDrug">
                <el-option label="总承包壹级资质" value="总承包壹级资质"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考察项目类型" prop="reportType">
              <el-select v-model="form.reportType">
                <el-option label="住宅" value="住宅"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合作意愿" prop="startDate">
              <el-select v-model="form.reportType">
                <el-option label="强烈" value="强烈"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="考察结果" prop="editUserName">
              <el-select v-model="form.reportType">
                <el-option label="合格" value="合格"></el-option>
                <el-option label="不合格" value="不合格"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">2.供应商人员信息</div>
      <el-table empty-text="暂无数据" stripe border element-loading-text="请稍候,数据正在加载中..." :data="tableData2" v-loading="loading">
        <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
        <el-table-column prop="personName" label="对接人"></el-table-column>
        <el-table-column prop="mobile" label="联系方式"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="small" @click="addGongFang" style="float: right;margin-top: 10px;">添加供方</el-button>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">3.供应商重要指标</div>
      <el-form ref="form" :inline="true" label-width="130px" :model="form" :rules="rules" class="m-3">
        <el-row>
          <!--            <el-col :span="8">-->
          <!--              <el-form-item label="单位名称" prop="masterName">-->
          <!--                <el-input v-model="form.masterName"></el-input>-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->
          <el-col :span="8">
            <el-form-item label="承接模式" prop="scope">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承接模式与我司匹配度" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                      <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="项目所在公司年度合同额" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                       <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目所在地实际承包人年度合同额" prop="invesReason">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="近三年与知名地产合作履历" prop="reportType">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="委派实际承包人" prop="startDate">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="委派项目经理" prop="editUserName">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="主营业务" prop="editUserName">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主营业务覆盖区域" prop="editUserName">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分公司数量" prop="editUserName">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="有分公司的省份或城市" prop="editUserName">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="从事项目经理工作年限" prop="editUserName">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="管理项目质量" prop="editUserName">
              <el-select v-model="form.reportType">
                <el-option label="优秀" value="优秀"></el-option>
                <el-option label="良好" value="良好"></el-option>
                <el-option label="合格" value="合格"></el-option>
                <el-option label="不合格" value="不合格"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="企业性质" prop="editUserName">
              <el-select v-model="form.reportType">
                <el-option label="国有企业未改制" value="国有企业未改制"></el-option>
                <el-option label="国有企业改制未彻底" value="国有企业改制未彻底"></el-option>
                <el-option label="国有企业改制彻底" value="国有企业改制彻底"></el-option>
                <el-option label="民营企业" value="民营企业"></el-option>
                <el-option label="集体所有制" value="集体所有制"></el-option>
                <el-option label="混合所有制" value="混合所有制"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成立时间：">
              <el-date-picker v-model="value1" type="date" placeholder="成立时间："> </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="进入我司项目所在地承接项目的时间：">
              <el-date-picker v-model="value1" type="date" placeholder="进入我司项目所在地承接项目的时间："> </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="备注（不合格原因）" prop="editUserName">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">4.承接模式及劳务分包模式</div>
      <el-form ref="form" :inline="true" label-width="130px" :model="form" :rules="rules" class="m-3">
        <el-row>
          <el-col :span="8">
            <el-form-item label="承接模式" prop="masterName">
              <el-select v-model="form.invesReason" @change="onSelectedDrug">
                <el-option label="直属承包项目模式" value="直属承包项目模式"></el-option>
                <el-option label="内部承包项目模式" value="内部承包项目模式"></el-option>
                <el-option label="个人/区域独立承包项目模式" value="个人/区域独立承包项目模式"></el-option>
                <el-option label="合作承包项目模式" value="合作承包项目模式"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="劳务分包模式" prop="scope">
              <el-select v-model="form.invesReason" @change="onSelectedDrug">
                <el-option label="按工种分包管理" value="按工种分包管理"></el-option>
                <el-option label="按标段或楼栋整体分包管理" value="按标段或楼栋整体分包管理"></el-option>
                <el-option label="按项目整体分包管理" value="按项目整体分包管理"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="办公地址" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                      <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="包清工工种" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                       <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="包工包料工种" prop="invesReason">
              <el-input v-model="form.supCateName">
                <!--                       <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否自有劳务公司" prop="reportType">
              <el-select v-model="form.reportType">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否具有自有产业化工人（数量）" prop="startDate">
              <el-input v-model="form.supCateName">
                <!--                       <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">5.单位概况及业绩</div>
      <el-form ref="form" :inline="true" label-width="130px" :model="form" :rules="rules" class="m-3">
        <el-row>
          <el-col :span="8">
            <el-form-item label="长期合作战略客户" prop="masterName">
              <el-input v-model="form.masterName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地产项目占比" prop="scope">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="公司机关办公管理人员数量" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                      <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="现场执行项目经理数量" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                       <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="近三年公司每年年度合同额（总公司-总包房建类）" prop="invesReason">
              <el-input v-model="form.supCateName">
                <!--                       <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="近三年公司每年年度产值（总公司-总包房建类）" prop="invesReason">
              <el-input v-model="form.supCateName">
                <!--                       <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="pt-3 pl-3 pr-3 mx-auto mh">
      <div class="table-top-title" style="margin-bottom: 10px">6.考察附件（考察照片及考察报告）</div>
      <el-form ref="form" :inline="true" label-width="130px" :model="form" :rules="rules" class="m-3">
        <el-row>
          <el-col :span="12">
            <el-form-item label="上传图片" prop="invesReason">
              <el-upload
                class="upload-demo"
                ref="upload"
                :action="getUploadUrl()"
                :data="uploadData"
                :fileList="fileList"
                :before-upload="beforeAvatarUploadphoto"
                :on-change="handleChange"
                :on-success="handleAvatarSuccess"
                multiple
                :limit="3"
              >
                <el-button size="small" type="primary" @click="submitUpload">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>
              </el-upload>
            </el-form-item>
            <el-table
              empty-text="暂无数据"
              stripe
              border
              element-loading-text="请稍候,数据正在加载中..."
              :data="tableDataphoto"
              v-loading="loading"
            >
              <el-table-column type="index" width="50" label="序号" align="center"> </el-table-column>
              <el-table-column prop="attachDesc" label="图片名称"></el-table-column>
              <el-table-column prop="uploadDate" label="上传日期"> </el-table-column>
              <el-table-column prop="userName" label="上传人"> </el-table-column>
              <el-table-column label="查看">
                <template slot-scope="scope">
                  <span>{{ scope.row.filePath }} + {{ scope.row.fileReName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <i @click="delete1(scope.row.id)" class="el-icon-delete" title="删除" style="margin-left:5px" />
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <el-form-item label="考察报告" prop="invesReason">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="table-top-title" style="margin-bottom: 10px">7.背调结果</div>
      <el-form ref="form" :inline="true" label-width="130px" :model="form" :rules="rules" class="m-3">
        <el-row>
          <el-col :span="8">
            <el-form-item label="质量" prop="masterName">
              <el-input v-model="form.masterName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="飞检排名" prop="scope">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="工期滞后（天）" prop="supCateName">
              <el-input v-model="form.supCateName">
                <!--                      <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="劳务模式" prop="supCateName">
              <el-select v-model="form.reportType">
                <el-option label="大劳务分包" value="大劳务分包"></el-option>
                <el-option label="工种单项分包" value="工种单项分包"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="恶性事件" prop="invesReason">
              <el-input v-model="form.supCateName">
                <!--                       <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资金实力" prop="invesReason">
              <el-input v-model="form.supCateName"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否停工待料" prop="supCateName">
              <el-select v-model="form.reportType">
                <el-option label="是" value="是"></el-option>
                <el-option label="否" value="否"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="承接模式" prop="supCateName">
              <el-input v-model="form.supCateName"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="整体评论" prop="supCateName">
              <el-input v-model="form.supCateName"> </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="背调附件" prop="invesReason">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button size="small" @click="add" style="float: right;margin-top: 10px;">取消</el-button>
      <el-button type="primary" size="small" style="float: right;margin: 10px;">暂存信息</el-button>
      <el-button type="primary" size="small" @click="tiJiao" style="float: right;margin-top: 10px;">提交考察信息</el-button>
    </el-row>
    <el-dialog :visible.sync="flag1" title="选择考察分类">
      <project-tree @itemClick="onChangeKind" />
    </el-dialog>

    <el-dialog :visible.sync="flag2" title="选择考察报告编辑人" width="70%">
      <user @itemClick="onChangeUser" />
    </el-dialog>
    <el-dialog :visible.sync="flag3" title="选择供方" width="70%">
      <el-form ref="formgongfang" :inline="true" label-width="100px" :model="formgongfang" :rules="rules" class="m-3">
        <el-row>
          <el-col :span="8">
            <el-form-item label="对接人" prop="personName">
              <el-input v-model="formgongfang.personName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系方式" prop="mobile">
              <el-input v-model="formgongfang.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formgongfang.email">
                <!--                      <el-button slot="append" icon="el-icon-search" @click="flag1=true"></el-button>-->
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="right">
          <el-form-item>
            <el-button type="primary" size="small" @click="tableshows">暂存信息</el-button>
            <el-button size="small" @click="flag3 = false">取消</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="flag4" title="选择人员" width="70%">
      <user2 @itemClick="onChangeUser2" />
    </el-dialog>

    <el-divider></el-divider>
  </div>
</template>

<script>
import ProjectTree from "./components/ProjectTree";
import user from "./components/user";
import user2 from "./components/user2";
export default {
  components: {
    user,
    user2,
    ProjectTree,
  },
  data() {
    return {
      loading: false,
      value1: "",
      depName: "",
      depGuid: "",
      masterId: "",
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
      // tableshow:true,
      fileList: [],

      tableData: [],
      tableDatalianx: [
        {
          comFullName: "张根",
          supCateNames: "15231113633",
          email: "472378@qq.com",
        },
      ],
      tableData2: [],
      showFlag: false,
      options1: [],
      options2: [],
      dropDownGroup: {},
      projectVisible: false,
      categoryVisible: false,
      options: [
        {
          value: "资源扩充",
          label: "资源扩充",
        },
        {
          value: "项目招标",
          label: "项目招标",
        },
      ],
      formgongfang: {
        personName: "",
        mobile: "",
        email: "",
      },
      form: {
        id: "",
        creatorUserId: 0,
        reportType: "",
        startUserName: "",
        masterName: "",
        supCate: "",
        supCateName: "",
        tempId: "",
        tempName: "",
        editUser: "",
        editUserName: "",
        startDate: "",
        endDate: "",
        scope: "",
        remark: "",
        invesReason: "",
        invesStatus: "",
        bidProjectName: "",
      },
      rules: {
        reportType: [{ required: true, message: "请选择报告类型", trigger: "change" }],
        masterName: [{ required: true, message: "请填写主题名称", trigger: "blur" }],
        scope: [{ required: true, message: "请填写适用范围", trigger: "blur" }],
        supCateName: [{ required: true, message: "请选择考察分类", trigger: "change" }],
        invesReason: [{ required: true, message: "请选择考察目的", trigger: "change" }],
        tempId: [{ required: true, message: "请选择考察打分模版", trigger: "change" }],
        startDate: [{ required: true, message: "请选择开始日期", trigger: "change" }],
        endDate: [{ required: true, message: "请选择结束日期", trigger: "change" }],
        editUserName: [{ required: true, message: "请选择考察报告编辑人", trigger: "change" }],
      },
    };
  },
  mounted() {
    this.getPeople();
    this.getPhotoList();
    this.$api.invest.GetAllDropDown().then(res => {
      this.dropDownGroup = res;
    });
    this.$api.invest.GetSupplierCategoryTree().then(res => {
      this.options1 = res;
    });
    this.$api.invest.GetInvesTempletList().then(res => {
      this.options2 = res;

      var row = this.$route.query.row;
      if (row) {
        if (row.id) {
          this.form = row;
          if (this.form.invesReason == "项目招标") {
            this.showFlag = true;
          }
          this.masterId = row.id;
          this.getGongFang();
          this.getPeople();
        }
      }
    });
  },
  methods: {
    // 上传图片
    getUploadUrl() {
      return process.env.VUE_APP_API_URL + "/api/FileUpload/InvesImageUpload";
    },
    beforeAvatarUploadphoto() {
      const fileSuffix = file.name.substring(file.name.lastIndexOf("."));
      const whiteList = [".JPG", ".PNG", ".JPEG", ".jpg", ".png", ".jpeg"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件格式有误");
        return false;
      }
      const isLt = file.size / 1024 / 1024 < 5;
      if (!isLt) {
        this.$message.error("上传文件大小不能超过5兆");
        return false;
      }
    },
    handleChange(file, fileList) {
      if (fileList.length > 0) {
        this.fileList = [fileList[fileList.length - 1]];
      }
    },
    handleAvatarSuccess() {
      if (response.success) {
        this.$message.success(response.message);
        this.getPhotoList();
      } else {
        this.$message.error(response.message);
      }
    },
    submitUpload() {
      Object.assign(this.uploadData, {}, { masterId: this.masterId, FileName: this.fileName });
      // this.$refs.upload.submit();
    },
    getPhotoList() {
      this.$http.get("/InvesAttach/GetInvesImageList", { masterId: this.masterId }).then(res => {
        this.tableDataphoto = res.data;
      });
    },
    deletephoto(id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.get("InvesLianDoMaster/DeleteInvesImage", { id }).then(res => {
            if (res.success) {
              this.$message.success("删除成功");
              this.getPhotoList();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    tableshows() {
      // this.tableshow = false
      this.flag3 = false;
      this.$refs.formgongfang.validate(valid => {
        if (valid) {
          this.$http.post("InvesLianDoMaster/SaveInvesContactInfo", this.formgongfang).then(res => {
            if (res.data.success) {
              this.$message.success("保存成功");
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    add() {
      this.$router.push({
        path: "/invest/InvestDemo",
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // tempChange(value){
    //   this.tempId =
    // },
    delete2(id) {
      this.$confirm("此操作将永久清空该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.ClearDepartmentPerson({ masterId: this.masterId, depGuid: id }).then(res => {
            if (res.success) {
              this.$message.success(res.message);
              this.getPeople();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
    onChangeUser2(row) {
      var p = {
        masterId: this.masterId,
        userGuid: row.userGuid,
        depName: this.depName,
        depGuid: this.depGuid,
      };
      this.$api.invest.SaveInvesPerson(p).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.getPeople();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getPeople() {
      // this.$http.get("/SysConfig/GetSysConfigList", { params: obj })
      this.$http.get("/InvesLianDoMaster/GetInvesContactList", { masterId: this.masterId }).then(res => {
        this.tableData2 = res.data;
      });
    },
    addPeople(row) {
      this.flag4 = true;
      this.depGuid = row.depId;
      this.depName = row.depName;
    },
    delete1(id) {
      // this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      //   this.$http.get("InvesLianDoMaster/DeleteInvesSupplierById",{id}).then(res => {
      //     if(res.success) {
      //       this.$message.success('删除成功');
      //       this.getGongFang();
      //     } else {
      //       this.$message.error(res.message)
      //     }
      //   })
      // }).catch(() => {
      //   this.$msg({ type: "info", message: "已取消删除", });
      // });
    },
    getGongFang() {
      this.$api.invest.GetInvesSupplierList({ masterId: this.masterId }).then(res => {
        this.tableData = res;
      });
    },
    addGongFang() {
      this.flag3 = true;
    },
    onChangeGongFang(id) {
      this.$api.invest.SaveInvesSupplier2({ masterId: this.masterId, supplierId: id }).then(res => {
        if (res.success) {
          this.$message.success(res.message);
          this.getGongFang();
        } else {
          this.$message.error(res.message);
        }
      });
      // this.$http.post("/InvesSupplier/SaveInvesSupplier", {masterId:this.masterId,supplierId:id}).then(res => {
      //   if(res.success) {
      //     this.$message.success(res.message)
      //     this.getGongFang();
      //   } else {
      //     this.$message.error(res.message)
      //   }
      // });
    },
    onChangeKind(kind) {
      this.form.supCate = kind.id;
      this.form.supCateName = kind.cateName;
      this.flag1 = false;
    },
    onChangeUser(kind) {
      this.form.editUser = kind.userGuid;
      this.form.editUserName = kind.userName;
      this.flag2 = false;
    },
    onSelectedDrug(item) {
      if (item == "项目招标") {
        this.showFlag = true;
      } else {
        this.showFlag = false;
      }
    },
    loadQueryForm() {
      this.$api.BidPlan.GetBidPlanDropDown().then(res => {
        this.dropDownGroup = res;
      });
    },
    loadForm() {
      this.$api.BidPlan.GetOneBidPlanById(this.form.id).then(res => {
        this.form = res;
      });
    },
    onChangeProject(project) {
      this.form.projectId = project.id;
      this.form.projectName = project.projectFullName;
      this.projectVisible = false;
    },
    onChangeCategory(category) {
      console.log(category);
      this.form.bidCateId = category.id;
      this.form.bidCateName = category.cateName;
      this.categoryVisible = false;
    },
    onSubmit() {
      if (this.form.invesReason == "项目招标") {
        if (!this.form.bidProjectName) {
          this.$message.error("请填写招标项目名称");
          return;
        }
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$api.invest.SaveInvesMaster(this.form).then(res => {
            if (res.success) {
              this.$message.success("保存成功");
              this.masterId = res.returnValue1;
              this.tempId = this.form.tempId;
              this.getPeople();
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
    onCancle() {
      this.$router.push({
        path: "/invest/myStartInvest",
      });
    },
    tiJiao() {
      this.$confirm("提交后不能修改，确认要提交考察信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.invest.SubmitInves({ id: this.masterId }).then(res => {
            if (res.success) {
              this.$message.success(res.message);
              this.$router.push({
                path: "/invest/myStartInvest",
              });
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$msg({ type: "info", message: "已取消删除" });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select,
.el-input {
  width: 16rem;
}

.el-form-item {
  margin-bottom: 10px;
}

.mh {
  /*min-height:500px;*/
}
::v-deep .el-form-item__label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 20px;
  padding: 5px 12px 0 0;
  box-sizing: border-box;
}
</style>
