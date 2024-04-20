<script setup>
import { ref } from "vue";
const value = ref(false)
</script>

<template>
  <div class="w-full h-14 fixed block top-0 left-0 shadow-sm bg-white z-[399] bottom-line overflow-hidden">
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
            <el-switch v-model="value" />
          </div>
          <el-divider direction="vertical" style="height: 100%" />
          <div class="w-[31px] h-full relative block ml-1 cursor-pointer">
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
</style>