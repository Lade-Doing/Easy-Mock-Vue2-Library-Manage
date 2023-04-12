import myaxios from '../myaxios'
// 直接写函数更方便
// 这里导出一个对象，在该对象里面定义函数，不管定义多少个函数，要使用的时候一般都会使用
// 无须按需导入，当然导出一个个普通函数也可以
// export default{
//     getBookInofList(){
//         // 通过axios发送异步请求获取数据
//         return myaxios({
//             url:'bookinfo/list',
//             method:'get'
//         })
//     }
// }
export function getBookInofList(){
        // 通过axios发送异步请求获取数据
        return myaxios({
            url:'bookinfo/list',
            method:'get'
        })
}
export function search(page,size,searchWhere){
    // 通过axios发送异步请求获取数据
    return myaxios({
        url:'/bookinfo/list/search/${page}/${size}',
        method:'post',
        data:searchWhere //searchWhere没有传值就是空值，即无条件分页查询
    })
}
export function bookAdd(bookform){
   return myaxios({
    url:'/addbookinfo',
    method:'post',
    data:bookform
   })
}
export function bookEdit(id){
    return myaxios({
        url:'/bookinfo/${id}',
        method:'get'
    })
}

export function updateBook(bookObj){
    return myaxios({
        url:'/bookinfo/${bookObj.id}',
        method:'put',
        data:bookObj
    })
}

//删除图书信息
export function deleteBookById(id){
    return myaxios({
        url:'/bookinfo/${id}',
        method:'delete'
    })
}
