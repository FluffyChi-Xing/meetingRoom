<script setup>
import { reactive,ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";
import { useCounterStore } from "@/stores/counter.js";
import {UserFilled} from "@element-plus/icons-vue";
//store
const store = useCounterStore()
//user
const user = reactive({
  name: '',
  password: '',
  email: '',
  code: ''
})
//refresh
const refresh = () => {
  //不管怎么样，目前拉取用户数据先清空localstorage
  //localStorage.removeItem('accessToken')
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
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}
//placeholder
const placeholder = reactive({
  username: '',
  password: '',
  email: ''
})
//拉取用户数据

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
              <el-input v-model="user.name" clearable maxlength="12" show-word-limit />
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="user.password" clearable show-password/>
            </el-form-item>
            <el-form-item label="邮箱">
              <div class="w-full h-full relative flex">
                <el-input v-model="user.email" clearable />
                <el-button type="primary" class="ml-2 h-full">发送验证码</el-button>
              </div>
            </el-form-item>
            <el-form-item label="验证码">
              <el-input v-model="user.code" placeholder="请输入验证码" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="w-full h-auto">保存修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>