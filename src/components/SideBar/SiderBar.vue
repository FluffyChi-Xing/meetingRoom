<script setup>
import { ref } from "vue";
import {Bell, Clock, EditPen, Files, List, PieChart, Setting} from "@element-plus/icons-vue";
import { onMounted } from "vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
//default
const defaultActive = ref('1')
//router
const router = useRouter()
//function
const jumpTo = () => {
  router.push('/history')
}
const goBack = () => {
  router.push('/meeting')
}
const goRoom = () => {
  router.push('/room')
}
const userManage = () => {
  router.push('/userMan')
}
const book = () => {
  router.push('/book')
}
const statistic = () => {
  router.push('/statistic')
}
//route
const route = useRoute()
//checkRoute
const checkRoute = () => {
  switch (route.fullPath) {
    case '/meeting':
      defaultActive.value = '1'
          break;
    case '/history':
      defaultActive.value = '2'
          break;
    case '/room':
      defaultActive.value = '3-1'
          break;
    case '/userMan':
      defaultActive.value = '3-2'
          break;
    case '/book':
      defaultActive.value = '3-3'
          break;
    case '/statistic':
      defaultActive.value = '3-4'
          break;
  }
}
//挂载
onMounted(() => {
  checkRoute()
})
//路由变化
watch(() => route.fullPath,() => {
  checkRoute()
})
//isShow
const isShow = ref(true)
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <el-menu
        :default-active="defaultActive"
        mode="vertical"
        style="border: none"
    >
      <el-menu-item index="1" @click="goBack">
        <el-icon><List /></el-icon>
        <span>会议室列表</span>
      </el-menu-item>
      <el-menu-item index="2" @click="jumpTo">
        <el-icon><Bell /></el-icon>
        <span>预定历史</span>
      </el-menu-item>
      <el-sub-menu v-show="isShow" index="3">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>后台管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" @click="goRoom">
            <el-icon><EditPen /></el-icon>
            <span>会议室管理</span>
          </el-menu-item>
          <el-menu-item index="3-2" @click="userManage">
            <el-icon><Files /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="3-3" @click="book">
            <el-icon><Clock /></el-icon>
            <span>预约管理</span>
          </el-menu-item>
          <el-menu-item index="3-4" @click="statistic">
            <el-icon><PieChart /></el-icon>
            <span>统计</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped>

</style>