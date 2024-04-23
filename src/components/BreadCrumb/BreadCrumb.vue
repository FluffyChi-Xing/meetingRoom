<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import {ArrowRight} from "@element-plus/icons-vue";
//route
const route = useRoute()
//router list
const routerList = ref()
//set name
const setter = () => {
  for (let i = 0;i < routerList.value.length;i ++) {
    switch (routerList.value[i].path) {
      case '/':
        routerList.value[i].name = '根目录'
        break;
      case '/meeting':
        routerList.value[i].name = '会议中心'
        break;
      case '/room':
        routerList.value[i].name = '会议室管理'
        break;
      case '' :
        routerList.value[i].name = '会议室列表'
        break;
      case '/history' :
        routerList.value[i].name = '预定历史'
        break;
      case '/user' :
        routerList.value[i].name = '用户中心'
        break;
      case '/userMan':
        routerList.value[i].name = '用户管理'
        break;
      case '/book':
        routerList.value[i].name = '预约管理'
        break;
    }
  }
}
onMounted(() => {
  routerList.value = route.matched
  setter()
})
//watch
watch(() => route.fullPath,() => {
  routerList.value = []
  routerList.value = route.matched
  setter()
})
</script>

<template>
  <div class="w-full h-10 py-3 relative block overflow-hidden">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="item in routerList" :key="item" :to="{ path: item.path }">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>

</style>