<script setup>
import { reactive, ref } from "vue";
//top data
const topForm = reactive({
  username: '',
  nickName: '',
  email: ''
})
//user table
const userTable = ref([
  {
    id: 1,
    username: '张三',
    nickName: '瘪三',
    password: '13223242',
    email: '131ww@ww.com',
    avatar: 'https://sasasa.ss.com'
  },
  {
    id: 2,
    username: '张三',
    nickName: '瘪三',
    password: '13223242',
    email: '131ww@ww.com',
    avatar: 'https://sasasa.ss.com'
  },
  {
    id: 3,
    username: '张三',
    nickName: '瘪三',
    password: '13223242',
    email: '131ww@ww.com',
    avatar: 'https://sasasa.ss.com'
  },
  {
    id: 4,
    username: '张三',
    nickName: '瘪三',
    password: '13223242',
    email: '131ww@ww.com',
    avatar: 'https://sasasa.ss.com'
  }
])
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- 顶部工具栏 -->
    <div class="w-full h-[100px] pt-3 relative block">
      <el-form
          :inline="true"
          label-width="auto"
          v-model="topForm"
      >
        <el-form-item label="用户名">
          <el-input v-model="topForm.username" placeholder="请输入用户名" clearable />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="topForm.nickName" placeholder="请输入昵称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button icon="Search" type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="topForm.email" placeholder="请输入昵称" clearable />
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格主体 -->
    <div style="height: calc(100% - 140px)" class="w-full relative block overflow-hidden">
      <el-table
          :data="userTable"
          stripe
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="密码" prop="password" />
        <el-table-column label="昵称" prop="nickName" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column label="用户头像" prop="avatar" />
        <el-table-column label="操作">
          <el-button type="text" size="small">冻结</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 底部分页器 -->
    <div class="w-full h-10 relative flex justify-end">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<style scoped>

</style>