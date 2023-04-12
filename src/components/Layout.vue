<template>
    <div>
        <app-header class="header"></app-header>
        <app-navbar class="navbar"></app-navbar>
        <app-main class="main"></app-main>
    </div>
</template>
<script>
import AppHeader from './AppHeader/index.vue'
import AppNavbar from './AppNavbar/index.vue'
import AppMain from './AppMain/index.vue'
export default{
    components:{
        AppHeader,
        AppNavbar,
        AppMain
    }
}
</script>
<style scoped>
.header{
    position:absolute;
    padding:5px 5px 5px 0;
    height: 50px;
    line-height:50px;
    background-color:#130505;
    left:0px;
    right: 0px;
    top:0px;
}
.navbar{
    position:absolute;
    width: 200px;
    background-color:#515c64;
    left:0px;
    bottom: 0px;
    top:60px;
    overflow: auto;
}
.main{
    position:absolute;
    padding:5px;
    /* background-color:#1e2020; */
    left:200px;
    right:0px;
    bottom:0px;
    top:60px;
    padding:10px;
    overflow-y:auto;
}
</style>