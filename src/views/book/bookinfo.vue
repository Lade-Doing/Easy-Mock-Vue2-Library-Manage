<template>
    <div>


        <!-- 条件查询 :inline="true" ,表示行内显示/一行显示； :model绑定查询条件(在data里要有) -->
        <el-form :inline="true" :model="searchWhere" class="demo-form-inline" style="margin-top:20px" ref="searchForm">

            <el-form-item label="书名" size="mini" prop="bookName">
                <el-input v-model="searchWhere.bookName" placeholder="书名" style="width:150px">
                </el-input>
            </el-form-item>

            <el-form-item label="出版社" size="mini" prop="press" @click.right.prevent.native="dialogPressVisible=true">
                <el-input v-model="searchWhere.press" placeholder="出版社"  style="width:150px">
                </el-input>
            </el-form-item>

            <el-form-item label="图书类型" size="mini" prop="bookType">
                <!-- bookTypeOptions要绑定到data中才会有生效，要不然找不到bookTypeOptions -->
                <el-select v-model="searchWhere.bookType" placeholder="图书类型" style="width:200px">
                    <el-option v-for="option in bookTypeOptions" :key="option.type" :label="option.name"
                        :value="option.type"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="出版日期" size="mini" prop="publicationdate">
                <el-date-picker size="mini" v-model="searchWhere.publicationdate" type="daterange" unlink-panels
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>

            <el-form-item size="mini">
                <el-button type="primary" @click="fetchDate">查询</el-button>
                <el-button @click="resetForm()">重置</el-button>
                <el-button type="primary" @click="addHandle">新增</el-button>

                <!-- /*##这是一个弹窗##*/
                !!!!
                !!!!
                !!!!
                -->
                <el-dialog title="图书信息编辑" :visible.sync="dialogFormVisible" width="500px" style="padding:10px">
                    <el-form :model="form" label-width="100px" ref="form" label-position="right"
                        style="width:400px;margin-top:-20px;"
                        :rules="rules"
                        >
                        <!-- form为指定要绑定的对象，在data中必须定义为一个对象，后面通过form.xx指定具体表单，
                    label-width指定表单前面标签（比如书号）的宽度，label-position指定标签靠右对齐，ref为表单ref属性
                    （类似于id属性，后面单击【确定】按钮要靠该属性提交表单），样式为设置表单的宽度 -->
                        <el-form-item label="书号" style="margin-bottom:10px" prop="bookISBN">
                            <el-input v-model="form.bookISBN" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="书名" style="margin-bottom:10px" prop="bookName">
                            <el-input v-model="form.bookName" size="mini" type="textarea"></el-input>
                        </el-form-item>
                        <el-form-item label="作者" style="margin-bottom:10px" prop="author">
                            <el-input v-model="form.author" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="出版社" style="margin-bottom:10px" prop="press">
                            <el-input v-model="form.press" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="出版日期" style="margin-bottom:10px" prop="publicationdate">
                            <el-date-picker v-model="form.publicationdate" type="date" placeholder="选择日期" style="width:120px" size="mini">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="价格" size="mini" style="margin-bottom:10px" prop="price">
                            <el-input v-model="form.price"></el-input>
                        </el-form-item>
                        <el-form-item label="数量" style="margin-bottom:10px" prop="quantity">
                            <el-input v-model="form.quantity" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item label="图书类型" prop="bookType">
                            <el-select v-model="form.bookType" size="mini" placeholder="图书类型" style="width:120px">
                                <el-option v-for="option in bookTypeOptions" :key="option.type" :label="option.name"
                                    :value="option.type"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false" size="mini">取消</el-button>
                        <el-button type="primary" @click="form.id === null?addData():updateDate()" size="mini">确定</el-button>
                    </div>
                </el-dialog>
            </el-form-item>
        </el-form>

        <!-- 选择出版社对话框
        ********* ***********
        -->
        <el-dialog title="选择出版社" :visible.sync="dialogPressVisible" width="800px">
            <Press @sendData="getData"></Press>
        </el-dialog>



        <!-- data为要绑定的数据，border为显示表格边框(本例不加),max-height为表格最大高度。 
         由于数据多，大于此高度会自动显示滚动条 -->
        <el-table :data="bookinfolist" style="width:100%" max-height="380">
            <!-- fixed为固定此列；prop为字段名；label为表头名；type设置为index就会自动添加索引(即序号)，从1开始 -->
            <el-table-column fixed type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="bookISBN" label="书号" width="150"></el-table-column>
            <el-table-column prop="bookName" label="书名" width="200"></el-table-column>
            <el-table-column prop="author" label="作者" width="100"></el-table-column>
            <el-table-column prop="press" label="出版社" width="150"></el-table-column>
            <el-table-column prop="publicationdate" label="出版日期" width="150"></el-table-column>
            <el-table-column prop="price" label="价格" width="100"></el-table-column>
            <el-table-column prop="quantity" label="数量" width="100"></el-table-column>
            <el-table-column prop="bookType" label="图书类型" width="100">
                <!-- scope表示作用域插槽：data绑定的数据 -->
                <template slot-scope="scope">
                    <span>{{ scope.row.bookType | bookTypeFilter }}</span>
                </template>
            </el-table-column>
            <!-- fixed为固定列 -->
            <el-table-column fixed="right" label="操作" width="200">
                <!-- scope.$index为获取当前行的索引，scope.row为获取当前行数据，编辑修改时只要传一个行对应的id即可，说明
                id虽然没有显示出来，但是bookinfolist中是含有id的-->
                <template slot-scope="scope">
                    <el-button size="min" type="primary" @click="handleEdit(scope.row.id)">
                        编辑
                    </el-button>
                    <el-button size="min" type="danger" @click="handleDelete(scope.row.id)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total,sizes,prev,pager,next,jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
import { bookEdit,bookAdd,updateBook,deleteBookById,search } from '../../utils/api/bookinfo.js'
import Press from '@/views/press/press.vue'
const bookTypeOptions = [
    { type: '1', name: '编程类' },
    { type: '2', name: '前端类' },
    { type: '3', name: '设计类' },
    { type: '4', name: '移动开发类' }
]
export default {
    filters: {
        bookTypeFilter(type) {
            //数组对象有一个find方法，查找数组中的一个数组/对象
            //参数是一个回调，obj代表的是数组中要查找的对象。对象的type值等于传入过来
            // 的值，就获取这个对象，比如传入的type为2，那自然就到bookTypeOptions数组中
            // 查找type=2的那个对象，并返回
            const booktypeobj = bookTypeOptions.find(obj => obj.type === type)
            // booktypeobj对象存在就返回它的name值，即类型的中文名，否则返回null
            return booktypeobj ? booktypeobj.name : null
        }
    },
    components:{
        Press
    },
    data() {
        return {
            bookinfolist: [], //定义数组，以便接受从后端获取到的数据列表,
            total: 0,
            currentPage: 1, //当前页，默认为第1页
            pageSize: 10,//每页显示条数，为10条
            searchWhere: {
                // 子组件传给的出版社id，可以方便后端进行处理。
                id:null,
                bookName: '',
                press: '',
                bookType: '',
                publicationdate: '',
            }, //查询条件
            bookTypeOptions,//等价于bookTypeOption:bookTypeOption
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }
                ]
            },
            // 添加表单或编辑表单
            dialogFormVisible: false,
            dialogPressVisible:false,
            form: {
                bookISBN:'',
                bookName:'',
                bookType:'',
                author:'',
                press:'',
                publicationdate:'',
                quantity: 500,//设置初值
                price:0,
                //新增一个id属性，用来判断是否是新增还是编辑，以达到复用组件的目的。
                // 设置初值为null，然后在弹窗函数里判断，null为新增，不是null为编辑
                // 可以在标签上面加一个？：
                id:null,
            },
            rules:{ //表达验证规则
                bookISBN:[
                    { required:true,message:'请输入书号',trigger: 'blur'},
                ],
                bookName:[
                    { required: true,message:'请输入书名',trigger: 'blur'},
                ],
                publicationdate:[
                    { required: true,message:'请选择日期',trigger:['blur','change']}
                ],
                quantity:[
                    { required:true,message:'数量不能为空',trigger:'blur' },
                    { type: 'number',message: '数量必须为数字型',trigger:'blur' }
                ]
            }
        }
    },
    //数据在组件初始化后就要获取，所以定义在created钩子函数中去调用接口方法获取数据
    created() {
        this.fetchDate();
    },
    methods: {
        fetchDate() {
            // getBookInofList().then(res=>{
            //     const resp=res.data
            //     this.bookinfolist=resp.data //从这里的this不能少，resp.data就是
            //     //从后端获取到的图书信息管理数据
            //     console.log(resp)
            // })
            search(this.currentpage, this.pageSize, this.searchWhere).then(res => {
                const resp = res.data.data;
                // 后端处理row，可以让他们返回一个就可以
                this.bookinfolist = resp.rows;//这里的list不能少
                this.total = resp.total;
                console.log(res)
                this.$message("查询成功");
            }).catch(err => {
                console.log("获取失败")
            })
        },
        handleEdit(id) {
            console.log("编辑" + id)
            this.addHandle();
            bookEdit(id).then(res=>{
                const resp=res.data;
                if(resp.flag){
                    // 复用组件，将返回数据显示在弹窗上面。
                    this.form=resp.data
                }
                else{
                    //提示获取数据失败，后端修改message。s
                    this.$message({
                        message:resp.message,
                        type:"warning"
                    })
                }
            }).catch(err=>{

            })

        },
        handleDelete(id) {
            this.$confirm('确定删除这条记录吗？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                // console.log("delete")
                deleteBookById(id).then(res=>{
                    const resp=res.data;
                    //下面会先给出提示，再刷新数据列表。
                    this.$message({
                        message:resp.message,
                        type:resp.flag? "success":"error" //动态显示提示内容
                    });
                    if(resp.flag){ //删除成功，刷新数据列表
                        this.fetchDate();
                    }
                })
            }).catch(()=>{
                console.log('cancel')
            })
            console.log("删除" + id)
        },
        handleSizeChange(currentPage) { //currentPage接受到的就是当前的页码，
            //包括单击前往到页码
            this.currentPage = currentPage;
            this.fetchDate();
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage);
            //其实发现后端要根据传过去的currentPage进行处理
            this.fetchDate();
        },
        resetForm() {
            console.log(this.$refs.searchForm)
            this.$refs.searchForm.resetFields();
            this.$message("重置成功");
        },


        // 新增按钮事件
        addHandle(){
            //先弹出添加数据的对话框
            this.dialogFormVisible = true;
            //添加重置代码，与上面查询重置是一样的，不过这里用this.$nextTick()用来
            // 防止表单还没加载之前就重置导致的错误，这样的this.$nextTick()可以等表单加载完后再
            // 进行重置数据
            this.$nextTick(()=>{
                this.$refs.form.resetFields();
            })
        },
        //
        
        // 新增弹窗里的确定方法
        addData(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    console.log(111)
                    //提交表单数据到后端，form必须再data中有定义
                    bookAdd(this.form).then(res=>{
                        const resp=res.data;
                        console.log(resp)
                        if(resp.flag){
                            //添加数据成功，刷新列表数据
                            this.fetchDate();
                            //关闭添加数据的对话框，下面的this不能少
                            this.dialogFormVisible=false;
                        }
                        else{
                            this.$message({
                                message:resp.message,
                                type:'warining'
                            })
                        }
                    })
                }else{
                    this.$message({
                        message:'添加失败',
                        type:'warining'
                    })
                }
            })
        },
        // 编辑弹窗里的确定方法
        updateDate(){
            this.$refs.form.validate((valid)=>{
                if(valid){ //表单验证通过
                    updateBook(this.form).then(res=>{
                        const resp=res.data
                        if(resp.flag){
                            this.fetchDate()
                            this.form.id=null   //不要忘记把id置空，否则再次点击【新增】按钮时
                                                //打开对话框，单击【确定】按钮时执行的就是修改操作
                                                // 关闭对话框
                            //关闭弹窗
                            this.dialogFormVisible=false
                            
                            this.$message({
                            message:"修改成功!"
                        })
                        }
                    }).catch(err=>{
                        this.$message({
                            message:"请求失败,数据异常。",
                            type:'warning'
                        })
                    })
                }else{
                    this.$message({
                        message:"输入有误"
                    })
                    return false
                }
            })
        },

        // 由出版社子组件传来的值
        getData(currentRow){
            console.log('父组件',currentRow)
         // 将出版社名称赋给相应的搜索框，而它绑定的是searchWhere.press
        this.searchWhere.press=currentRow.pressName
        // 下面最好也把id给传过去，这样在父组件中单击【查询】按钮时就会把当前记录的id也发送过去，
        // 方便后端使用(不传不影响功能实现)，该id也可以在data中的searchWhere对象中定义出来，初值设置为null即可
        // 关闭当前的对话框
        this.dialogPressVisible=false
        }
    }
}
</script>
<style>


.dialog-footer{
}
</style>