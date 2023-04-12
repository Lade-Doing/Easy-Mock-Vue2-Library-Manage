import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/components/Layout.vue'

import Home from '@/views/home/index.vue'
import Booktype from '@/views/book/booktype.vue'
import Bookinfo from '@/views/book/bookinfo.vue'
import Kucunsearch from '@/views/kucun/kucunsearch.vue'
import Rukusearch from '@/views/kucun/rukusearch.vue'
import Chukusearch from '@/views/kucun/chukusearch.vue'
import User from '@/views/user/user.vue'




Vue.use(VueRouter)

const routes = [
  {
    path:"/login",
    name:"login",
    component:Login
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect:"/home",
    children:[
      {
        path:"/home",
        name:"home",
        component:Home,
        meta:{
          title:"首页"
        }
      },
      {
        path:"/booktype",
        component:Booktype,
        meta:{
          title:"图书类别管理"
        }
      },
      {
        path:"/bookinfo",
        component:Bookinfo,
        meta:{
          title:"图书信息管理"
        }
      },
      {
        path:"/kucunsearch",
        component:Kucunsearch,
        meta:{
          title:"库存查询"
        }
      },
      {
        path:"/chukusearch",
        component:Chukusearch,
        meta:{
          title:"出库查询"
        }
      },
      {
        path:"/rukusearch",
        component:Rukusearch,
        meta:{
          title:"入库查询"
        }
      },
      {
        path:"/user",
        component:User,
        meta:{
          title:"用户管理"
        }
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
