<script setup>
import TopNavComponent from "@/components/TopNav/TopNavComponent.vue";
</script>

<template>
  <div class="w-screen h-screen relative block overflow-hidden">
    <!-- 顶部导航栏 -->
    <TopNavComponent />
    <RouterView />
  </div>
</template>

<style scoped>

</style>