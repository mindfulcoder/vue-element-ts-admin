<template>
  <div class="login-wrap">
    <div class="login-form">
      <div class="title">欢迎使用管理系统</div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" class="form-content">
        <el-form-item prop="username">
          <el-input type="text"
                    placeholder="username"
                    v-model="loginForm.username"
                    tabindex="1"
                    autocomplete="on">
            <template #prepend>
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-tooltip class="login-tips" v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="password"
                    v-model="loginForm.password"
                    tabindex="2"
                    show-password
                    autocomplete="on"
                    @input="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter="submitForm('loginForm')">
            <template #prepend>
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        </el-tooltip>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </div>
        <p class="login-tips">Tips : 用户名admin为管理员,其他为普通用户，密码随便填。</p>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {ElMessage} from "element-plus";
import {login} from "../utils/user";

export default defineComponent({
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123123",
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
        ],
      },
      capsTooltip: false,
    }
  },
  methods: {
    submitForm(name: string) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          ElMessage.success("登录成功");
          login(this.loginForm.username, this.loginForm.password)
          this.$router.push("/");
        } else {
          ElMessage.error("登录失败");
          return false;
        }
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    }
  }
})
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
}

.title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}

.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.form-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
