<template>
  <div class="login_container">
<<<<<<< HEAD
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :rules="rules"
        :model="loginForm"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
=======
    <!-- 登录盒子  -->
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登录表单 -->
      <el-form class="login_form">
        <!-- 用户名 -->
        <el-form-item>
          <el-input prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary">登录</el-button>
          <el-button type="info">重置</el-button>
>>>>>>> a209ec96951ec63518ae43ab0d46a5b0f0e07e3f
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import  {login_api} from  "@/api"
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    reset() {
      console.log(this.$refs.loginFormRef.$el, 888);
      this.$refs.loginFormRef.resetFields();
    },

    submitForm() {
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid,6666);

        if (!valid) return;

        //var { data: res } = await this.$http.post("login", this.loginForm);
        var { data: res } = await login_api(this.loginForm)
        console.log(res, 7777);
        if (res.meta.status !== 200) {
          this.$message({
            message: "登陆失败",
            type: "error"
          });


        } else {
          this.$message({
            message: "登陆成功",
            type: "success"
          });

          window.sessionStorage.setItem("token",res.data.token);

          this.$router.push("/home");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
p {
  z-index: 999;
  background-color: pink;
}
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
=======
export default {};
</script>

<style lang="less" scoped>
.login_container {
  background-color: pink;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
>>>>>>> a209ec96951ec63518ae43ab0d46a5b0f0e07e3f
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
<<<<<<< HEAD

=======
>>>>>>> a209ec96951ec63518ae43ab0d46a5b0f0e07e3f
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
<<<<<<< HEAD

=======
>>>>>>> a209ec96951ec63518ae43ab0d46a5b0f0e07e3f
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
<<<<<<< HEAD

=======
>>>>>>> a209ec96951ec63518ae43ab0d46a5b0f0e07e3f
.btns {
  display: flex;
  justify-content: flex-end;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> a209ec96951ec63518ae43ab0d46a5b0f0e07e3f
