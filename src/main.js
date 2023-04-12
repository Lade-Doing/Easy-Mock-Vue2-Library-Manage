import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 登录权限校验、拦截
import './permission'
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts 
Vue.use(ElementUI)
// 静态
// Vue.config.productionTip = false
// 动态
Vue.config.productionTip = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
