<script setup>
import { reactive,ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";
import { useCounterStore } from "@/stores/counter.js";
import {UserFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {captcha} from "@/utils/captcha.js";
//store
const store = useCounterStore()
//user
const user = reactive({
  name: '',
  email: '',
  code: '',
  password: '',
  nickName: '',
  headPic: '',
  phoneNumber: ''
})
//refresh
const refresh = () => {
  //不管怎么样，目前拉取用户数据先清空localstorage
  //localStorage.removeItem('accessToken')
  const accessToken = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');
  const isAdmin = ref();
  console.log(typeof isAdmin.value)
  isAdmin.value = store.currentPermission;
  axios.get('http://localhost:3000/user/refresh', {
    params: {
      refreshToken: refreshToken,
      isAdmin: isAdmin.value
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  }).then((res) => {
    pullUserInfo(accessToken);
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
//placeholder
const placeholder = reactive({
  username: '',
  email: '',
  nickName: '',
  phoneNumber: '',
  headPic: '',
})
//拉取用户数据
const pullUserInfo = (accessToken) => {
  axios.get('http://localhost:3000/user/info',{
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${accessToken}`,
    }
  }).then((res) => {
    placeholder.phoneNumber = res.data.data.phone;
    placeholder.headPic = res.data.data.headPic;
    placeholder.nickName = res.data.data.nickName;
    placeholder.username = res.data.data.username;
    placeholder.email = res.data.data.email;
  }).catch((e) => {
    console.log(e);
  })
}
//submit update
const updateInfo = () => {
  const accessToken = localStorage.getItem('access');
  axios.post('http://localhost:3000/user/updateInfo',{
    username: user.name,
    nickName: user.nickName,
    headPic: user.headPic,
    phoneNumber: user.phoneNumber,
    password: user.password,
    captcha: user.code,
    email: user.email,
  },{
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${accessToken}`,
    }
  }).then((res) => {
    ElMessage({
      type: "success",
      message: res.data.message,
    })
    pullUserInfo(accessToken);
  }).catch((e) => {
    console.log(e);
    ElMessage({
      type: "warning",
      message: '修改错误',
    })
  })
}
//context
const context = ref('发送')
//isDisabled
const isDisabled = ref(false)
//tick
const tick = ref(60)
//push captcha
const pushCap = () => {
  if (user.email !== '') {
    captcha(user.email)
    let timer = setInterval(() => {
      if (tick.value > 0) {
        tick.value -= 1;
        context.value = `重新发送(${tick.value})`;
        isDisabled.value = true;
      } else {
        clearInterval(timer);
        isDisabled.value = false;
        context.value = '发送验证码';
      }
    },1000)
  }
}
//om
onMounted(() => {
  refresh()
})
</script>

<template>
  <div class="w-full h-full relative pt-4 block px-4 overflow-hidden">
    <!-- 顶部notice -->
    <el-alert title="注意" description="如果账号密码有误请联系管理员" show-icon type="warning" />
    <!-- 主体内容 -->
    <div style="height: calc(100% - 65px)" class="w-2/3 p-4 relative block mx-auto">
      <div class="w-full h-10 leading-10 relative text-[20px] block text-black text-center">
        用户中心
      </div>
      <div style="height: calc(100% - 40px)" class="w-full relative block">
        <div class="w-full h-10 relative flex justify-center">
          <el-avatar shape="square" :icon="UserFilled" class="w-full h-full" />
        </div>
        <div style="height: calc(100% - 56px)" class="w-full relative block mt-4">
          <el-form
              v-model="user"
              label-width="auto"
          >
            <el-form-item label="用户名">
              <el-input v-model="user.name" :placeholder="placeholder.username" clearable maxlength="12" show-word-limit />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="user.nickName" :placeholder="placeholder.nickName" clearable maxlength="10" show-word-limit />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="user.password" clearable type="password" show-password placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="头像链接">
              <el-input v-model="user.headPic" :placeholder="placeholder.headPic" clearable />
            </el-form-item>
            <el-form-item label="电话号">
              <el-input v-model="user.phoneNumber" :placeholder="placeholder.phoneNumber" clearable maxlength="11" show-word-limit />
            </el-form-item>
            <el-form-item label="邮箱">
              <div class="w-full h-full relative flex">
                <el-input v-model="user.email" :placeholder="placeholder.email" clearable />
                <el-button type="primary" class="ml-2 h-full" :disabled="isDisabled" @click="pushCap">{{ context }}</el-button>
              </div>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="user.code" placeholder="请输入验证码" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="w-full h-auto" @click="updateInfo">保存修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>