<template>
    <div>
        <!-- 二级路径显示 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" v-show="$route.path !== '/home' && $route.path!=='/'">
            <span class="line">|</span>
            <el-breadcrumb-item v-show="$route.path == '/booktype' || $route.path == '/bookinfo'">图书信息管理系统</el-breadcrumb-item>
            <el-breadcrumb-item v-show="$route.path == '/kucunsearch' || $route.path == '/chukusearch' || $route.path == '/rukusearch'">图书信息管理系统</el-breadcrumb-item>
            <el-breadcrumb-item v-show="$route.path != '/home'"
                :to="{ path:$route.path }"
            >{{ $route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- layout子组件出口，即渲染在此处 -->
        <router-view>
        </router-view>
    </div>
</template>
<script></script>
<style>
.line {
    position:absolute;
    color: white;
    border-left: 3px solid red;
    left: 10px;
}
.el-breadcrumb{
    height: 10px;
    padding: 15px;
    border-radius: 5px;
    /* 复制element border 边框投影效果 */
    box-shadow: 0 2px 12px 0 rgb(0,0,0,0.1);
    margin-bottom:10px;
}
</style>
