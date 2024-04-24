<script setup>
import { ref } from "vue";
import {ElementPlus} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import {ElMessage} from "element-plus";
//nest logo
const nest = ref('https://nestjs.com/img/logo-small.svg')
//router
const router = useRouter()
const getStart = () => {
  router.push('/login')
  ElMessage({
    type: "info",
    message: '登录'
  })
}
</script>

<template>
  <div class="w-full h-full relative block">
    <div class="w-2/3 h-full relative grid grid-rows-2 gap-3 mx-auto">
      <div class="w-full h-full relative grid grid-cols-2 gap-3 pt-14">
        <!-- 标题部分 -->
        <div class="w-full h-full relative grid grid-rows-3 gap-1">
          <div class="w-full h-full text-[56px] relative block text-left title font-bold">
            Nest会议预订系统
          </div>
          <div class="w-full h-full relative block text-left text-black font-bold text-[56px] overflow-hidden text-ellipsis">
            项目源自于掘金
          </div>
          <div class="w-full h-full relative flex px-4">
            <el-button @click="getStart" style="background-color: #E0234E;color: black;outline: none;border: none" round size="large" class="my-auto">Get Start</el-button>
          </div>
        </div>
        <div class="w-full h-full relative block">
          <div class="w-full h-full relative block img-bg"></div>
          <div class="w-[300px] h-[300px] my-auto absolute top-4 right-14 block">
            <img :src="nest" alt="nest" class="w-full h-full relative block object-cover">
          </div>
        </div>
      </div>
      <div class="w-full h-full relative grid grid-cols-3 gap-3 py-4">
        <!-- 特点说明 -->
        <div class="w-full card-border h-1/2 p-4 relative grid grid-rows-3 gap-2 rounded-lg overflow-hidden bg-[#f6f6f7]">
          <!-- nest logo -->
          <div class="w-full h-full relative block">
            <div class="w-10 h-full relative block bg-[#8e96aa24] rounded-md overflow-hidden">
              <img :src="nest" alt="nest" class="w-full h-full relative block object-cover">
            </div>
          </div>
          <!-- title -->
          <div class="w-full h-full relative block text-left text-black font-bold leading-10">
            后端基于Nest实现
          </div>
          <!-- description -->
          <div class="w-full h-full relative block text-left text-black font-thin">
            这是一个基于nest的会议室预约项目
          </div>
        </div>
        <div class="w-full card-border h-1/2 p-4 relative grid grid-rows-3 gap-2 rounded-lg overflow-hidden bg-[#f6f6f7]">
          <!-- element logo -->
          <div class="w-full h-full relative block">
            <div class="w-10 h-full relative block bg-[#8e96aa24] rounded-md overflow-hidden">
              <el-icon style="width: 100%;height: 100%;color: #409eff">
                <ElementPlus style="width: 40px;height: 40px" />
              </el-icon>
            </div>
          </div>
          <!-- title -->
          <div class="w-full h-full relative block text-left text-black font-bold leading-10">
            Element Plus
          </div>
          <!-- description -->
          <div class="w-full h-full relative block text-left text-black font-thin">
            用户界面使用Element-Plus构建
          </div>
        </div>
        <div class="w-full card-border h-1/2 p-4 relative grid grid-rows-3 gap-2 rounded-lg overflow-hidden bg-[#f6f6f7]">
          <!-- Vue logo -->
          <div class="w-full h-full relative block">
            <div class="w-10 h-full relative flex justify-center py-[5px] bg-[#8e96aa24] rounded-md overflow-hidden">
              <img src="../../../assets/logo.svg" alt="nest" style="width: 30px;height: 30px" class="relative block">
            </div>
          </div>
          <!-- title -->
          <div class="w-full h-full relative block text-left text-black font-bold leading-10">
            前端基于Vue 3.0 框架
          </div>
          <!-- description -->
          <div class="w-full h-full relative block text-left text-black font-thin">
            本项目使用Vue 3.0 框架作为基础
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-border {
  border: 1px solid #f6f6f7;
}
.card-border:hover {
  transition: all .25s ease-in-out;
  border-color:  #00DC82;
}
.title {
  background: -webkit-linear-gradient(120deg, #35495e -80%, #E0234E);
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.img-bg {
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #E0234E 30%, #35495e80);
  --vp-home-hero-image-filter: blur(72px);
  background-image: var(--vp-home-hero-image-background-image);
  filter: var(--vp-home-hero-image-filter);
}
</style>