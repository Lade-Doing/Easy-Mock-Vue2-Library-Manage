<template>
    <div>


        <!-- 条件查询 :inline="true" ,表示行内显示/一行显示； :model绑定查询条件(在data里要有) -->
        <el-form :inline="true" :model="searchWhere" class="demo-form-inline" style="margin-top:20px" ref="searchForm">

            <el-form-item label="出版社名字" size="mini" prop="pressName">
                <el-input v-model="searchWhere.pressName" placeholder="出版社" style="width:150px">
                </el-input>
            </el-form-item>

            <el-form-item size="mini">
                <el-button type="primary" @click="fetchDate">查询</el-button>
            </el-form-item>
        </el-form>



        <!-- data为要绑定的数据，border为显示表格边框(本例不加),max-height为表格最大高度。 
         由于数据多，大于此高度会自动显示滚动条 -->
        <el-table :data="presslist" style="width:100%" max-height="380" highlight-current-row @current-change="CurrentChange">
            <!-- fixed为固定此列；prop为字段名；label为表头名；type设置为index就会自动添加索引(即序号)，从1开始 -->
            <el-table-column fixed type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="pressName" label="出版社名称" width="150"></el-table-column>
            <el-table-column prop="pressAddress" label="出版社地址" width="180"></el-table-column>
            <el-table-column prop="code" label="邮编" width="80"></el-table-column>
            <el-table-column prop="chargePerson" label="负责人" width="80"></el-table-column>
            <el-table-column prop="phone" label="电话" width="100"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total,sizes,prev,pager,next,jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
import pressApi from '@/utils/api/press.js'
export default {
    data() {
        return {
            presslist:[],
            total: 0,
            currentPage: 1, //当前页，默认为第1页
            pageSize: 10,//每页显示条数，为10条
             //查询条件
            searchWhere: {
                pressName:"",
            },
        }
    },
    //数据在组件初始化后就要获取，所以定义在created钩子函数中去调用接口方法获取数据
    created() {
        this.fetchDate();
    },
    methods: {
        fetchDate() {
            pressApi.search(this.currentpage, this.pageSize, this.searchWhere).then(res => {
                const resp = res.data.data;
                // 后端处理row，可以让他们返回一个就可以
                this.presslist = resp.rows;//这里的list不能少
                this.total = resp.total;
                console.log(res)
                this.$message("查询成功");
            }).catch(err => {
                console.log("获取失败")
            })
        },
        handleSizeChange(currentPage) { //currentPage接受到的就是当前的页码，
            //包括单击前往到页码
            this.currentPage = currentPage;
            this.fetchDate();
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage);
            //其实发现后端要根据传过去的currentPage进行处理
            this.fetchDate();
        },
        CurrentChange(currentRow,oldCurrentRow){
            this.$emit('sendData',currentRow)
        }
    }
}
</script>
<style>


.dialog-footer{
}
</style>