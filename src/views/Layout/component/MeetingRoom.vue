<script setup>
import { reactive, ref } from "vue";
//form
const form = reactive({
  name: '',
  location: '',
  capacity: '',
  item: ''
})
//table
const table = ref([
  {
    id: 1,
    name: '会议室一号',
    location: '一楼',
    capacity: '50',
    item: '智慧白板'
  },
  {
    id: 2,
    name: '会议室一号',
    location: '一楼',
    capacity: '50',
    item: '智慧白板'
  },
  {
    id: 3,
    name: '会议室一号',
    location: '一楼',
    capacity: '50',
    item: '智慧白板'
  },
  {
    id: 4,
    name: '会议室一号',
    location: '一楼',
    capacity: '50',
    item: '智慧白板'
  }
])
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- 顶部功能栏 -->
    <div class="w-full h-[100px] relative block overflow-hidden">
      <el-form
          :inline="true"
          v-model="form"
          label-width="auto"
      >
        <el-form-item label="会议室名称" >
          <el-input placeholder="请输入会议室名称" v-model="form.name" clearable />
        </el-form-item>
        <el-form-item label="会议室人数" >
          <el-input placeholder="请输入会议室人数" v-model="form.capacity" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-full h-auto">搜索会议室</el-button>
        </el-form-item>
        <el-form-item label="会议室位置" >
          <el-input placeholder="请输入会议室位置" v-model="form.location" clearable />
        </el-form-item>
        <el-form-item label="会议室物品" >
          <el-input placeholder="请输入会议室物品" v-model="form.item" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="w-full h-auto">添加会议室</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格主体 -->
    <div style="height: calc(100% - 140px)" class="w-full relative block">
      <el-table
          stripe
          :data="table"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="会议室名称" prop="name" />
        <el-table-column label="会议室地点" prop="location" />
        <el-table-column label="会议室人数" prop="capacity" />
        <el-table-column label="会议室物品" prop="item" />
        <el-table-column label="操作" width="150" >
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="w-full h-10 relative flex justify-end">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<style scoped>

</style>