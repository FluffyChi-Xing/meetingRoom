<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";
//form
const form = reactive({
  name: '',
  location: '',
  capacity: '',
  item: ''
})
//dialogVisible
const dialogVisible = ref(false)
//page number
const pageNumber = ref()
//table
const table = ref()
//pageNo
const pageNo = ref(1)
//access
const access = localStorage.getItem('access').toString()
//pull table
const pullTable = () => {
  axios.post('http://localhost:3000/meeting/getAll',{
    pageSize: 5,
    pageNo: pageNo.value
  },{
    headers: {
      Authorization: `Bearer ${access}`
    }
  }).then((res) => {
    table.value = res.data.data;
    if (res.data.count === 0){
      pageNumber.value = 0
    }
    pageNumber.value = Math.ceil(res.data.count / 5) * 10;
    ElMessage({
      type: "success",
      message: res.data.message,
    })
  }).catch((err) => {
    console.log(err)
    ElMessage({
      type: "warning",
      message: '错误'
    })
  })
}
//change page
const changePage = (current) => {
  pageNo.value = current
  axios.post('http://localhost:3000/meeting/getAll',{
    pageSize: 5,
    pageNo: pageNo.value
  },{
    headers: {
      Authorization: `Bearer ${access}`
    }
  }).then((res) => {
    table.value = res.data.data;
    ElMessage({
      type: "success",
      message: res.data.message,
    })
  }).catch((err) => {
    console.log(err)
    ElMessage({
      type: "warning",
      message: '错误'
    })
  })
}
//fuzzy search room
const fuzzySearch = () => {
  if (form.item || form.name || form.location || form.capacity) {
    axios.post('http://localhost:3000/meeting/search',{
      name: form.name,
      location: form.location,
      capacity: form.capacity,
      equipment: form.item,
    },{
      headers: {
        Authorization: `Bearer ${access}`
      }
    }).then((res) => {
      table.value = res.data.data;
      ElMessage({
        type: "success",
        message: res.data.message,
      })
    }).catch((err) => {
      console.log(err)
      ElMessage({
        type: "warning",
        message: '错误'
      })
      console.log(err)
    })
  } else {
    ElMessage({
      type: "warning",
      message: '四个参数至少一个不为空'
    })
  }
  if (form.item && form.name && form.capacity && form.location) {
    axios.post('http://localhost:3000/meeting/search',{
      name: form.name,
      location: form.location,
      capacity: form.capacity,
      equipment: form.item,
    },{
      headers: {
        Authorization: `Bearer ${access}`
      }
    }).then((res) => {
      table.value = res.data.data;
      ElMessage({
        type: "success",
        message: res.data.message,
      })
    }).catch((err) => {
      console.log(err)
      ElMessage({
        type: "warning",
        message: '错误'
      })
      console.log(err)
    })
  }
}
//add room form
const createRoom = reactive({
  name: '',
  location: '',
  capacity: 0,
  equipment: '',
  description: ''
})
//add room
const addRoom = () => {
  dialogVisible.value = false
  if (createRoom.location && createRoom.name && createRoom.capacity && createRoom.equipment) {
    axios.post('http://localhost:3000/meeting/create',{
      name: createRoom.name,
      equipment: createRoom.equipment,
      capacity: createRoom.capacity,
      location: createRoom.location,
      description: createRoom.description,
    },{
      headers: {
        Authorization: `Bearer ${access}`
      }
    }).then((res) => {
      ElMessage({
        type: "success",
        message: res.data.message,
      })
    }).catch((err) => {
      console.log(err);
      ElMessage({
        type: "warning",
        message: '错误',
      })
    })
  } else {
    ElMessage({
      type: "warning",
      message: '四个参数都不可为空'
    })
  }
}
//om
onMounted(() => {
  pullTable()
})
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
          <el-button type="primary" class="w-full h-auto" @click="fuzzySearch">搜索会议室</el-button>
        </el-form-item>
        <el-form-item label="会议室位置" >
          <el-input placeholder="请输入会议室位置" v-model="form.location" clearable />
        </el-form-item>
        <el-form-item label="会议室物品" >
          <el-input placeholder="请输入会议室物品" v-model="form.item" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="success" class="w-full h-auto" @click="dialogVisible = true">添加会议室</el-button>
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
        <el-table-column label="会议室物品" prop="equipment" />
        <el-table-column label="操作" width="150" >
          <el-button size="small" type="text">编辑</el-button>
          <el-button size="small" type="text">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="w-full h-10 relative flex justify-end">
      <el-pagination @current-change="changePage" layout="prev, pager, next" :total="pageNumber" />
    </div>
    <!-- add dialog -->
    <el-dialog
        draggable
        v-model="dialogVisible"
        title="新建会议室"
        width="500"
    >
      <div class="w-full h-auto relative block p-4">
        <el-form
            label-width="auto"
            v-model="createRoom"
            status-icon
        >
         <el-form-item label="会议室名">
           <el-input v-model="createRoom.name" clearable placeholder="请输入会议室名" />
         </el-form-item>
          <el-form-item label="会议室位置">
            <el-input v-model="createRoom.location" placeholder="请输入会议室位置" clearable />
          </el-form-item>
          <el-form-item label="会议室设施">
            <el-input v-model="createRoom.equipment" placeholder="请输入会议室设施" clearable />
          </el-form-item>
          <el-form-item label="会议室容量">
            <el-input v-model="createRoom.capacity" clearable placeholder="请输入会议室容量" />
          </el-form-item>
          <el-form-item label="额外补充">
            <el-input v-model="createRoom.description" placeholder="请输入额外补充" clearable />
          </el-form-item>
          <el-form-item>
            <el-button class="w-full h-auto relative block" @click="addRoom" type="primary" icon="Plus">创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>