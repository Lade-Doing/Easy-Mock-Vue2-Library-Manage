// 导入VueRouter对象
import router from './router/index.js'
import { getUserInfo } from './utils/api/login'
import store from './store/index.js'
// import store from './store'
//利用VueRouter对象router的beforeEach方法进行校验
//前面登录逻辑是：提交用户名、密码到后端校验，校验成功后获取token，通过token到后端获取用户信息
router.beforeEach((to,from,next)=>{
    //获取token
    const token=store.state.user.token
    //如果没有获取到token
    if(!token){
        //要访问非登录页面，则不允许访问，让其返回登录界面
        if(to.path !== '/login') {
            // 这里因为没有导入elementUI而且不是vue组件，所以用不了this.$message
            alert("账号异常，请重新登录！")
            next({ path: '/login'})
        } else{ //访问的就是登录界面
            next() //不需要传入参数，默认就是默认路由
        }
    }
    else{
        //获取到token
        //请求登录路由/login,那就让其进入目标路由,这时用户可能要切换账号。
        if(to.path === '/login'){
            next();
        }
        else{
            //请求的是非登录页面，查看本地是否有存有用户信息，因为有些人会故意删掉用户信息，
            //利用漏洞
            const userinfo=store.state.user.user;
            if(userinfo){
                //获取到用户信息，则直接跳转到目标路由,
                //我在想这东西一定要先进行登录才可以有的，如果别人知道你的token的话，就
                // 容易被人入侵
                next();
            }
            else{
                // 这里不是组件，不能用this.$store.dispatch，而是要导入store
                // 对象后直接使用store.dispatch
                // 改为通过Vuex状态管理登录用户信息
                // res就是被触发的动作GetUserInfo回调的值（后端接口返回的整个对象信息）
                store.dispatch('GetUserInfo').then(res=>{
                    if(res.flag){  //不要再写res.data.data了，因为传过来的是promise对象已经处理为
                                    //.data后的整个对象了,res.data也就是用户属性信息，下面就没有flag了。
                        console.log(11)
                        next(); //继续访问
                    }
                    else{ //没有获取到用户信息则回到登录页面
                        next({path:'/login'})
                    }
                }).catch(error=>{
                    this.$message("用户不存在")
                })
            }
        }
    }
})