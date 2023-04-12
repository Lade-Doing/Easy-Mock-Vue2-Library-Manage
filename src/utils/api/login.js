import myaxios from '../myaxios'
export function login(username,password){
    return myaxios({
        url:'/user/login',
        method:'post',
        data:{
            username,
            password
        }
    })
}

export function getUserInfo(token){
    return myaxios({
        url:'/user/info/${token}',//由于这里需要拼接占位符，所以用''
        method:'get'
    })
}
export function logout(token){
    return myaxios({
        url:'/user/logout/${token}',
        method:'post',
        // data:{
        //     token  //完整写法是token:token
        // }
    })
}