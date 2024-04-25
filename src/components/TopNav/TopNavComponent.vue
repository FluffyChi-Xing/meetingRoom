<script setup>
import { ref } from "vue";
import { useDark, useToggle } from '@vueuse/core'
const value = ref(false)
//url
const url = ref('https://github.com/FluffyChi-Xing/meetingRoom.git')
//jump
const jump = () => {
  window.location.href = url.value
}
//darkmode

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="w-full h-14 fixed block top-0 left-0 shadow-sm main-bg z-[399] bottom-line overflow-hidden">
    <div class="w-4/5 h-full relative flex mx-auto">
      <!-- 导航栏标题 -->
      <RouterLink to="/" class="w-auto h-auto relative block">
        <div class="w-auto h-full relative block leading-[56px] text-center font-bold">
          Nest会议预约
        </div>
      </RouterLink>
      <!-- 右侧工具栏 -->
      <div class="w-[200px] py-3 h-full relative block ml-auto">
        <div class="w-full h-full relative flex">
          <el-divider direction="vertical" style="height: 100%" />
          <div class="relative flex justify-center">
            <el-switch @change="toggleDark" v-model="value" />
          </div>
          <el-divider direction="vertical" style="height: 100%" />
          <div @click="jump" class="w-[31px] h-full relative block ml-1 cursor-pointer">
            <img src="../../assets/image/github.png" alt="github" class="w-full h-full relative block object-cover">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottom-line {
  border-bottom: 1px solid #ececec;
}
.main-bg {
  color: var(--el-text-color-primary);
  background-color: var(--el-bg-color-overlay);
}
</style>