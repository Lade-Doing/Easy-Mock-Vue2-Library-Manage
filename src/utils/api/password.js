import myaxios from '@/utils/myaxios.js'
export default{
    checkPwd(userId,oldPassword){
        return myaxios({
            url:'/user/pwd',
            method:'post',
            //data主要用来查询返回给后端然后进行处理，再返回给前端响应一个的数据。
            data:{
                userId,
                oldPassword
            }
        })
    },
    //更新密码
    updatePwd(userId,newPassword){
        return myaxios({
            url:'/user/pwd',
            method:'put',
            data:{
                userId,
                newPassword
            }
        })
    }
}