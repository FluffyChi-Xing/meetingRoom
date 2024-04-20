<script setup>
import { ref,reactive } from "vue";
import {ElMessage} from "element-plus";
import { useRouter} from "vue-router";
//active
const active = ref('first')
//login-form
const loginForm = reactive({
  username: '',
  password: ''
})
//router
const router = useRouter()
//login submit
//sleep()
const loading = ref(false)
const login = () => {
  if (loginForm.password !== '' && loginForm.username !== '') {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      router.replace('/meeting')
      ElMessage({
        type: "success",
        message: '登陆成功'
      })
    },2000)
  }
  ElMessage({
    type: "warning",
    message: '用户名或密码不能为空'
  })
}
</script>

<template>
  <div class="w-screen h-screen relative flex justify-center bg-white overflow-hidden">
    <div class="w-[400px] h-auto relative my-auto block">
      <el-card class="w-full h-full relative block">
        <template #header>
          <span class="font-bold">会议室预约系统</span>
        </template>
        <!-- tabs栏 -->
        <div class="w-full h-auto relative block">
          <el-tabs class="demo-tabs w-full h-full" v-model="active">
            <el-tab-pane label="登录" name="first">
              <div class="w-full h-auto relative block">
                <el-form
                    label-width="auto"
                    class="w-full h-full relative block"
                    v-model="loginForm"
                >
                  <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名" v-model="loginForm.username" prefix-icon="User" clearable maxlength="10" show-word-limit />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input placeholder="请输入密码" v-model="loginForm.password" prefix-icon="Lock" clearable type="password" show-password />
                  </el-form-item>
                  <el-form-item>
                    <el-button :loading="loading" type="primary" round class="w-full h-auto relative block" @click="login">登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
              <div class="w-full h-[450px] relative block bg-red-950">

              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>