<template>
<el-row>
    <el-col :span="24" class="pr-2">
        <el-menu :default-active="$route.name" class="border">
            <el-menu-item v-for="(menu, index) in planMenu"
                        :key="menu.route"
                        :index="menu.route"
                        :class="{ 'border-bottom' : index < planMenu.length }"
                        style="height:40px"
                        @click="firstMenuClick(menu.index , menu.route)"
            >
                <i :class="menu.icon"></i>
                <span slot="title">{{menu.name}}</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</el-row>    
</template>

<script>
    export default {
        name: "PlanMenu",
        data() {
            return {
                planMenu:[]
            }
        },
        computed:{
            
        },
        mounted() {
            this.planMenu = [
                {
                    route:"/bid/bidMode1/EditStep1",
                    icon:"el-icon-menu",
                    name:"基本信息"
                },
                {
                    route:"/bid/bidMode1/EditStep2",
                    icon:"el-icon-menu",
                    name:"计划节点"
                },
                {
                    route:"/bid/bidMode1/EditStep3",
                    icon:"el-icon-menu",
                    name:"标段信息"
                },
                {
                    route:"/bid/bidMode1/EditStep4",
                    icon:"el-icon-menu",
                    name:"入围标准"
                },
                {
                    route:"/bid/bidMode1/EditStep5",
                    icon:"el-icon-menu",
                    name:"邀请供方"
                },
                {
                    route:"/bid/bidMode1/EditStep6",
                    icon:"el-icon-menu",
                    name:"采购小组成员"
                },
                {
                    route:"/bid/bidMode1/EditStep7",
                    icon:"el-icon-menu",
                    name:"招标公告"
                },
                {
                    route:"/bid/bidMode1/EditStep8",
                    icon:"el-icon-menu",
                    name:"相关附件"
                },
                {
                    route:"/bid/bidMode1/EditStep9",
                    icon:"el-icon-menu",
                    name:"提交方案"
                }
            ];
        },
        methods: {
            firstMenuClick(id, menuUrl) {
                const { baseId } = this.$route.params
                let to = menuUrl
                if(baseId) {
                    to += `/${baseId}`
                }
                this.$router.push({
                    path: to
                })
            }
        }
    }
</script>

<style scoped less>

 .el-menu-item {
  font-size: 14px;
  font-weight: 400;
}

 .el-menu-item, .el-submenu__title {
    height: 40px;
    line-height: 40px;
    position: relative;
    -webkit-box-sizing: border-box;
    white-space: nowrap;
    list-style: none;
}
</style>