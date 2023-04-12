<template>
    <div class="navbar">
        <!-- default-active默认选中的菜单项 -->
        <!-- :router="true"为开启路由模式，这个时候index代表的就是路由 -->
        <el-menu :router="true" default-active="/home" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
            background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="/home">
                <i class="el-icon-menu"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>图书信息管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/booktype">图书类别管理</el-menu-item>
                    <el-menu-item index="/bookinfo">图书信息管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span>图书库存管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="kucunsearch">库存查询</el-menu-item>
                    <el-menu-item index="rukusearch">入库查询</el-menu-item>
                    <el-menu-item index="chukusearch">出库查询</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/user">
                <i class="el-icon-s-check"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default{
    methods:{
        handleOpen(key,keyPath) {
            console.log(key,keyPath)
        },
        handleClose(key,keyPath){
            console.log(key,keyPath)
        }
    }
}
</script>
<style scoped>
.el-menu{
    border-right: none;    
}
</style>