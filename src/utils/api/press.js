//导入自定义的axios
import myaxios from '@/utils/myaxios'

//这里使用与bookinfo以及login不同的方法，导出一个对象，调用对象里面的方法来进行
// 我们也可以用按需导入的方式，像bookinfo按需导入的方法
export default{
    //分页查询方法
        search(page,size,searchWhere){
            return myaxios({
            url:'/press/list/search/${page}/${size}',
            method:'post',
            //data主要用来查询返回给后端然后进行处理，再返回给前端响应一个的数据。
            data:searchWhere
            })
        }
}