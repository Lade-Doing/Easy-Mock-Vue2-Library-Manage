import { getToken,setToken,getUser,setUser,removeToken } from '@/utils/usertoken.js'
import { login,getUserInfo,logout } from '@/utils/api/login.js'

const state={
    token:getToken(),//token的初值为通过getToken()到本地存储器中获取，就可以解决页面刷新token为null的问题。
    user:getUser()
}
const mutations={
    //设置Token
    SET_TOKEN(state,token)//参数state就是获取上面的state
    {
        state.token=token
        //写入本地
        setToken(token)
    },
    //设置用户信息
    SET_USER(state,user)//参数state就是获取上面的state
    {
        state.user=user
        setUser(user)
    },
}
// actions里面定义逻辑
const actions={
    // form也是一个对象，就是后面登录界面去发出(dispatch)动作(actions)，然后由
    // commit去提交。所以这里的form是由后面登录组件传递过来的（登录界面是对象，里面
    // 有用户名、密码）
    Login({commit},form)
    {
        // resolve表示触发成功处理，reject触发异常处理
        return new Promise((resolve,reject)=>{
            //login方法的返回值是一个promise对象（这是因为API/login.js里login
            // 方法是通过Axios返回的promise对象）
            login(form.username.trim(),form.password.trim()).then(res=>{
                const resp=res.data;//获取到就是响应的信息
                commit('SET_TOKEN',resp.data.token)
                    //提交突变，并提交载荷(载荷就是获取到后端的token)，然后就会触发
                    // SET_TOKEN方法执行，从而实现设置token
                resolve(resp) //执行成功的回调，即主调方调用成功把resp传给主调方
            }).catch(error=>{
                reject(error)//执行失败的回调，即主调方调用失败把error传给主调方
            })
        })
    },
    //通过token获取到用户信息
    GetUserInfo({ commit,state }) { //state不要放在 “}” 外面，因为那样是传递载荷
        return new Promise((resolve,reject) => {
            getUserInfo(state.token).then(res=>{
                const respUser=res.data;
                commit('SET_USER',respUser.data) //data就是用户信息
                resolve(respUser) //执行成功的回调，即主调方调用成功把respUser传给主调方
            }).catch(error=>{
                reject(error)
            })
        })
    },
    Logout( {commit,state} ){
        return new Promise((resolve,reject)=>{
            logout(state.token).then(res=>{
                const resp=res.data;
                commit('SET_TOKEN','')
                commit('SET_USER',null) //用户对象，设置为空值要传入null，要传入{}空对象，
                                        //{}不等价为null
                removeToken();
                resolve(resp)
            })
        })
    }
}

export default{
    state,
    mutations,
    actions
}