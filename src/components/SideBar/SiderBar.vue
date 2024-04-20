<script setup>
import { ref } from "vue";
import {Bell, List} from "@element-plus/icons-vue";
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
  router.back()
}
//route
const route = useRoute()
//checkRoute
const checkRoute = () => {
  switch (route.fullPath) {
    case '':
      defaultActive.value = '1'
          break;
    case '/history':
      defaultActive.value = '2'
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
    </el-menu>
  </div>
</template>

<style scoped>

</style>