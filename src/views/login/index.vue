<template>
    <div id="login-container">
        <el-form :rules="rules" ref="form" :model="form" class="login-form" label-width="70px">
            <h2 class="login-title">图书信息管理系统</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '输入密码', trigger: 'blur' },
                    { min: 6, max: 32, message: '密码长度在6到32个字符', trigger: ['blur', 'change'] }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            // console.log(this.$refs.form)
            this.$refs.form.validate((valid) => {
                if (valid) {
                    this.$message("正在登录中");
                    this.$store.dispatch('Login',this.form).then(res=>{
                        if(res.flag){
                            //前往首页即可，可以不通过token去获取用户信息，因为权限校验permission.js
                            // 会处理的
                            this.$message("登录成功!")
                            this.$router.push('/')
                        }else{
                            this.$message({
                                message:res.message,
                                type:'warning'
                            })
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>
<style scoped>
body {
    font: "微软雅黑";
    margin: 0;
}

#login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/login.png');
    background-size: cover;
    background-repeat: no-repeat;
}

.login-form {
    width: 350px;
    background-color: #fff;
    padding: 15px;
    border-radius: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -175px;
    margin-top: -125px;
}

.login-title {
    text-align: center;
    color: #606266;
}
</style>