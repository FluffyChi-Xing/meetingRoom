<script setup>
import { useRouter } from "vue-router";
import {UserFilled} from "@element-plus/icons-vue";
import SiderBar from "@/components/SideBar/SiderBar.vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";
//router
const router = useRouter()
//function
const jumpTo = () => {
  router.push('/user')
}
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <div class="w-4/5 h-full pt-14 relative grid grid-cols-5 mx-auto gap-3">
      <div class="w-full h-full relative flex">
        <div class="w-[95%] h-full relative block">
          <SiderBar />
        </div>
        <el-divider direction="vertical" style="height: 90%;margin-top: auto;margin-bottom: auto" />
      </div>
      <div class="w-full col-span-3 h-full relative block">
        <RouterView />
      </div>
      <div class="w-full h-full relative block pt-14">
        <div class="w-auto h-10 relative flex mx-auto mb-4">
          <el-divider direction="vertical" style="height: 100%;margin-left: 5px;margin-right: 5px" />
          <div class="w-10 h-full relative block cursor-pointer overflow-hidden">
            <el-avatar @click="jumpTo" shape="square" :icon="UserFilled" />
          </div>
          <div class="w-auto ml-3 h-full relative block text-center text-black leading-10">
            用户中心
          </div>
        </div>
        <!-- 面包屑导航 -->
        <BreadCrumb />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>