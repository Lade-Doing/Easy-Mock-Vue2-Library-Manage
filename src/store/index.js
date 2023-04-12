import Vue from 'vue'
// Vuex是Vue的一个插件，所以要先导入Vue
import Vuex, { Store } from 'vuex'
import user from './modules/user.js'

// 使用Vuex插件
Vue.use(Vuex)

// 实例化一个store对象，存储数据的仓库。
// Store是大写大写！！！
const store=new Vuex.Store({
    modules:{
      user
    }

})

//导出store对象，都不直接使用Vue的$store了。。
export default store
