<template>
  <div class="lg">
    <el-form :model="form" label-width="100px" class="demo-ruleForm" :rules="rules" ref="form">
      <el-form-item label="帐号" prop="username">
        <el-input v-model="form.username" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" id="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .lg {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background: url("../assets/325361.jpg") no-repeat center top;
  }
  .demo-ruleForm {
    width: 500px;
    margin: 300px auto;
  }
  #login {
    width: 300px;
  }
  .el-form-item__label {
    color: #fff !important;
    font-size: 20px !important;
  }
</style> 
<script>
  export default {
    data() {
      return {
        // 表单数据
        form: {
          username: "",
          password: ""
        },
        // 表单规则
        rules: {
          username: [
            // required 必填 trigger 触发条件
            { required: true, message: "请输入用户名", trigger: "blur" }
          ],
          password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        }
      };
    },
    methods: {
      submitForm() {
        // 提交后台的数据
        const data = {
          uname: this.form.username,
          upwd: this.form.password
        };
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$axios({
              // 请求路径
              url: "http://localhost:8899/admin/account/login",
              // 请求方式
              method: "POST",
              // 数据
              data,
              // 处理session跨域
              withCredentials: true
            }).then(res => {
              const { status, message } = res.data;
              if (status == 0) {
                this.$router.push("/");
              }
              if (status == 1) {
                this.$message.error(message);
                return;
              }
            });
          }
        });
      }
    }
  };
</script>