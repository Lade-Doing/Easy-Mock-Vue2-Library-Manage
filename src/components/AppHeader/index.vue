<template>
    <div class="header">
        <a href="/" style="padding-left:30px">
            <img class="logo" src="../../assets/logo1.png" width="40" height="40">
            <span class="title">图书管理系统</span>
        </a>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                欢迎您， {{ user.name }}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user" command="b">退出系统</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
            <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
                style="width:300px;margin-top:-30px;margin-bottom:-20px"
                size="mini"
            >
            <el-form-item label="旧密码" prop="oldpass">
                <el-input type="password" v-model="ruleForm.oldpass"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpass">
                <el-input type="password" v-model="ruleForm.newpass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpass">
                <el-input type="password" v-model="ruleForm.checkpass"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import passwordApi from '@/utils/api/password.js'
export default {
    methods:{
        handleCommand(command){
            switch(command){
                case 'a':
                    //修改密码
                    this.$message("单击了修改了密码");
                    this.updatePwd()
                    break;
                case 'b':
                    //退出系统
                    //调用logout方法，需要传入一个token，token在本地的localStorage中，
                    //在登录(login/index.vue)过程中通过localStorage记住了token信息，如下代码：
                    this.logoutSystem();
                    break;
                default:
                    break
            }
        },
        logoutSystem(){
            this.$store.dispatch('Logout').then(res=>{
                if(res.flag)
                {
                    //清除本地存储的token和用户信息，这里不需要，因为在Logout中已经实现退出成功
                    this.$router.push('/login')
                    this.$message("退出成功!")
                }else{
                    //若失败则给出提示消息
                    this.$message({
                        message:res.message,//获取接口返回的message
                        type:'warning',
                        duration:1000 //设置停留时间为1s
                    });
                }
            })
        },
        // 修改密码
        updatePwd(){
            this.dialogFormVisible=true;
            // 等待form表单出来后再进行里面的语句
            this.$nextTick(()=>{
                this.$refs.ruleForm.resetFields();
            })
        },
        submitForm(){
            //首先校验表单是否通过，直接复制bookinfo.vue里面的代码：
            // 这里有个bug，就是如果点击确定的话，还会引起旧密码的重新校验！！！(不是blulr是失去焦点就只触发一次吗？)
            this.$refs.ruleForm.validate(valid=>{
                if(valid){
                    passwordApi.updatePwd(this.user.id,this.ruleForm.newpass).then(res=>{
                        const resp=res.data;
                        //不论失败还是成功都会给出提示
                        this.$message({
                            message:resp.message,
                            type:resp.flag ? "success" : "warning"
                        });
                        if(resp.flag){
                            //更新成功
                            //清除本地存储的用户信息，并返回登录页面重新登录，代码跟上面退出系统
                            // 的代码一致，为了复用代码，才把上面退出系统代码封装成一个方法
                            this.logoutSystem();
                            // 退出对话框
                            this.dialogFormVisible=false
                        }else{
                            this.$message({
                                message:"请求失败",
                                type:"warning"
                            })
                        }
                    })
                }else{
                    this.$message("修改失败")
                }
            })
        },
        resetForm(){
            this.$refs.ruleForm.resetFields();
            console.log(passwordApi.checkPwd)
        }
    },
    data(){
        //自定义校验规则传入三个参数rule、value和callback（参考官网）
        const validateOldPass=(rule,value,callback)=>{
            //    rule是要检验字段的相关信息（字段名、字段类型等）
            //    value指输入的值，因此就是通过value参数去与后端获取到的旧密码相比较
            passwordApi.checkPwd(this.user.id,value).then(res=>{
                console.log("正在校验中")
                const resp=res.data;
                if(resp.flag){
                    //执行第三个参数，且不带参数
                    console.log("密码正确")
                    callback();
                }else{
                    //校验失败，执行第三个参数callback，需要传递参数为对象，参数可以是后端传过来的信息
                    callback(new Error(resp.message))
                }
            }).catch(err=>{
                console.log("请求失败")
            })
        }
        // 自定义校验，校验两次密码输入是否一致
        const validateCheckPass=(rule,value,callback)=>{
            // 此处value表示输入的确认密码，this.ruleForm.newpass获取输入的新密码。这里不需要
            // 判断为空情况，前面已有验证
            if(value!==this.ruleForm.newpass){
                //不相等。这里提示文字是"写死"的，因为这里没有后端接口返回相应信息
                callback(new Error('两次输入密码不一致'));
            }else{
                callback();
            }
        }    
        return{
            user:JSON.parse(localStorage.getItem("xdz-manager-user")),
            dialogFormVisible:false,
            ruleForm:{
                oldpass:'',
                newpass:'',
                checkpass:''
            },
            rules:{
                oldpass:[{ required: true, message:"旧密码不能为空", trigger: "blur"},
                { validator: validateOldPass, trigger: "blur"}],
                newpass:[{ required: true, message:"新密码不能为空", trigger: "blur"}],
                checkpass:[{ required: true, message:"确认密码不能为空"},
                { validator: validateCheckPass, trigger: ['change','blur']}]
            }
        }
    }
}
</script>
<style>
.login{
    /* 与padding属性冲突，所以针对<a>标签设置padding-left属性。 */
    border-radius:5px;
    vertical-align: middle;;
    width: 25px;
}
.title{
    position:absolute;
    color:#fff;
    padding-left:5px;
    font-size: 20px;
}
.el-dropdown-link{
    cursor:pointer;
    color:#fff
}
.el-icon-arrow-down{
    font-size: 12px;
}
/* 下拉菜单，先测试后面这部分样式，使其靠右 */
.el-dropdown{
    float: right;
    margin-right: 30px;
}
</style>