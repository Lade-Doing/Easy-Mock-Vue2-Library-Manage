// 基本配置
// import myaxios from '@/utils/myaxios'
// const BASE_URL='/dv-apis'
// export default {
//     getList(){
//         const promise1=myaxios({
//             method:'get',
//             url:BASE_URL+'/data.json'
//         })
//         return promise1;
//     }
// }

import myaxios from '@/utils/myaxios'
// const BASE_URL=[process.env.VUE_APP_BASE_API]
// myaxios配置好baseURL之后就不用再写BASE_URL了
export default {
    getList(){
        const promise1=myaxios({
            method:'get',
            url:'/data.json'
        })
        return promise1;
    }
}