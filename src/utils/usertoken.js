//定义两个常量
const TOKEN__KEY='xdz-manager-token'
const USER_KEY='xdz-manager-user'

// 以下导出的都是非默认成员，方便后面组件按需导入  封装函数--java的get、set差不读
//获取Token
export function getToken(){
    return localStorage.getItem(TOKEN__KEY)
}

//保存Token
export function setToken(token){
    return localStorage.setItem(TOKEN__KEY,token)
}

//获取用户信息
export function getUser(){
    //保存时用户信息是字符串，这里获取时需要把它转换为json对象
    return JSON.parse(localStorage.getItem(USER_KEY))
}

//保存用户信息
export function setUser(user){
    return localStorage.setItem(USER_KEY,JSON.stringify(user))
}

// 移除用户信息
export function removeToken(){
    localStorage.removeItem(TOKEN__KEY)
    localStorage.removeItem(USER_KEY)
}
