<template>
    <el-table
        empty-text="无符合条件的记录"
        stripe
        border
        element-loading-text="请稍候,数据正在加载中..."
        :data="form.tableData"
        v-loading="loading"
    >
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="planName" label="招标计划名称"></el-table-column>
        <el-table-column prop="sectionName" label="标段名称" width="400"></el-table-column>
        <el-table-column prop="sectionOrder" label="排序编号" width="120"></el-table-column>
    </el-table>
</template>

<script>
/**
 * 招标采购-标段信息
 */
export default {
    name: "step3",
    components: { },
    inject: ['reload'],
    data() {
        return {
            form: {
                tableData: []
            },
            loading: false,
        }
    },
    computed: {
        baseId() {
            return this.$route.params.baseId
        }
    },
    created: function () {
    },
    mounted() {
        this.getTableData()
    },
    methods: {
        getTableData() {
            this.$api.BidModeSection.GetBidModeSectionList(this.baseId).then(res => {
                this.form.tableData = res
            })
        }
    },
}
</script>
