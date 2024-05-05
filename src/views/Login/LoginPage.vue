<script setup>
import { ref,reactive } from "vue";
import {ElMessage} from "element-plus";
import { useRouter} from "vue-router";
import { useCounterStore } from "@/stores/counter.js";
import axios from "axios";
//store
const store = useCounterStore()
//active
const active = ref('first')
//login-form
const loginForm = reactive({
  username: '',
  password: '',
  Admin: '1'
})
//router
const router = useRouter()
//register
const registerForm = reactive({
  username: '',
  password: '',
  nickName: '',
  email: '',
  captcha: ''
})
//submit text
const subText = ref('发送')
//is disabled
const isDisabled = ref(false)

//captcha function
const captcha = () => {
  if (registerForm.email) {
    if (registerForm.username && registerForm.password) {
      const email = registerForm.email
      isDisabled.value = true
      let tick = 60
        let timer = setInterval(() => {
          if (tick > 0) {
            tick -= 1
            subText.value = `重新发送(${tick})`
          } else {
            clearTimeout(timer)
            isDisabled.value = false
            subText.value = '发送'
          }
        },1000)
      captcha(email);
    } else {
      ElMessage({
        type: "warning",
        message: '用户名和密码不可为空'
      })
    }
  } else {
    ElMessage({
      type: "warning",
      message: '邮箱不可为空'
    })
  }
}
//registerSubmit
const registerSubmit = () => {
  if (registerForm.username && registerForm.password && registerForm.nickName && registerForm.email && registerForm.captcha) {
    axios.post('http://localhost:3000/user/register',{
      username: registerForm.username,
      password: registerForm.password,
      nickName: registerForm.nickName,
      email: registerForm.email,
      captcha: registerForm.captcha
    },{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      ElMessage({
        type: "success",
        message: res.data.message
      })
    }).catch((e) => {
      ElMessage({
        type: "warning",
        message: '错误'
      })
      console.log(e)
    })
  }
}
//login submit
const loginSubmit = () => {
  if (!loginForm.username) {
    ElMessage({
      type: "warning",
      message: '用户名不可为空'
    })
  }
  if (!loginForm.password) {
    ElMessage({
      type: "warning",
      message: '密码不可为空'
    })
  }
  if (loginForm.username && loginForm.password ) {
    let Admin = ref();
    if (loginForm.Admin === '1') {
      Admin.value = 'false'
    }
    if (loginForm.Admin === '2'){
      Admin.value = 'true'
    }
    axios.post('http://localhost:3000/user/login',{
      username: loginForm.username,
      password: loginForm.password,
      isAdmin: Admin.value,
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then((res) => {
      if (res.data.data.code === 400){
        ElMessage({
          type: "warning",
          message: res.data.data.message
        })
      }else {
        router.replace('/meeting')
        ElMessage({
          type: "success",
          message: res.data.message
        })
        //缓存accessToken和refreshToken
        const accessToken = ref()
        accessToken.value = res.data.data.accessToken
        const refreshToken = ref()
        refreshToken.value = res.data.data.refreshToken
        localStorage.setItem('access',accessToken.value)
        localStorage.setItem('refresh',refreshToken.value)
        //暂存当前权限
        store.currentPermission = res.data.data.userInfo.isAdmin
        //暂存当前userId
        store.userID = res.data.data.userInfo.id;
      }
    }).catch((error) => {
      console.log(error)
    })
  } else {
    ElMessage({
      type: "warning",
      message: '登录错误'
    })
  }
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
        <div class="w-full h-auto p-4 relative block">
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
                    <el-input placeholder="请输入密码" maxlength="6" show-word-limit v-model="loginForm.password" prefix-icon="Lock" clearable type="password" show-password />
                  </el-form-item>
                  <el-form-item label="是否为管理员">
                    <el-radio-group
                        v-model="loginForm.Admin"
                    >
                      <el-radio value="1">否</el-radio>
                      <el-radio value="2">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" round class="w-full h-auto relative block" @click="loginSubmit">登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">
              <div class="w-full h-auto relative block">
                <el-form
                    label-width="auto"
                    v-model="registerForm"
                    class="w-full h-full relative block"
                >
                  <el-form-item label="用户名">
                    <el-input placeholder="请输入用户名" v-model="registerForm.username" clearable prefix-icon="User" />
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input placeholder="请输入密码" prefix-icon="Lock" v-model="registerForm.password" type="password" clearable show-password />
                  </el-form-item>
                  <el-form-item label="别名">
                    <el-input v-model="registerForm.nickName" placeholder="请输入别名" clearable />
                  </el-form-item>
                  <el-form-item label="邮箱">
                    <el-input v-model="registerForm.email" clearable placeholder="请输入邮箱" />
                  </el-form-item>
                  <el-form-item label="验证码">
                    <div class="w-full h-auto relative flex">
                      <el-input style="width: 240px" v-model="registerForm.captcha" maxlength="6" show-word-limit clearable placeholder="请输入验证码" />
                      <el-button type="primary" class="ml-4" @click="captcha" :disabled="isDisabled">{{ subText }}</el-button>
                    </div>
                  </el-form-item>
                  <el-form-item label="注册">
                    <el-button type="primary" class="w-full h-auto relative block" @click="registerSubmit">注册</el-button>
                  </el-form-item>
                </el-form>
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