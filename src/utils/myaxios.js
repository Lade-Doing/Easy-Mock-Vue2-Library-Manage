import axios from 'axios'
// 引入加载组件
import { Loading,Message } from 'element-ui'
// 基础版本
// const myaxios =axios.create({
//     baseURL:'',
//     timeout:5000,
// })

// myaxios对象
const myaxios =axios.create({
  baseURL:process.env.VUE_APP_BASE_API,
  timeout:5000,//单位是毫秒
})


// loading对象
const loading={
  loadingInstance:null,//定义loading实例对象
  open:function(){
    //创建Loading实例，同时就会显示正在加载中
    if(this.loadingInstance===null){
      this.loadingInstance=Loading.service({
          target:'.main',
          text:'玩命加载中',
          background:'rgb(0,0,0,0.5)'
      })
    }
  },
  close:function(){
    //loading实例不为空的时候，则关闭正在加载窗口
      if(this.loadingInstance!=null){
        this.loadingInstance.close();
      }
      this.loadingInstance=null
  }
}

//请求拦截器
myaxios.interceptors.request.use(config => {
    // Loading.service({target:'.main'});
    loading.open()
    //在发送之前做些什么
    return config;//一定要返回这个配置信息，要不然前端获取不到
    //然后返回，再发送给后端。
  },error => {
    //在发送失败后做些什么
    loading.close()

    return Promise.reject(error);
    //抛出错误的信息
  });
  //响应拦截器
myaxios.interceptors.response.use(function (response){
    //超出 2xx 范围的任何状态代码都会导致此函数触发
    //接收数据之后做些什么
    loading.close()
    const resp=response.data
    //如果不是200，说明后端响应有问题，比如把校验旧密码的接口code改为不是200，message改为 
    // 系统正在忙中......
    if(resp.code!==200){
      Message({
        message:resp.message || '系统异常',//如果resp.message里面没有信息，那么显示 系统异常.
        type:"warning",
        "duration":5000,
      showClose:true
      })
    }
    return response;
    //一定返回这个响应,要不前端接收不到
  },function(error){
    //超出 2xx 范围的任何状态代码都会导致此函数触发
    //接受数据错误之后做些什么
    loading.close()
    Message({
      message:error.message,
      type:"error",
      "duration":5000,
    })
    return Promise.reject(error);
  });

export default myaxios;