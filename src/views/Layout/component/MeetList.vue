<script setup>
import { reactive,ref } from "vue";
import axios from "axios";
import {onMounted} from "vue";
import {ElMessage} from "element-plus";
import { refresh } from '@/utils/refreshToken.js'
import {useCounterStore} from "@/stores/counter.js";
//page number
const pageNumber = ref()
//store
const store = useCounterStore()
//search
const search = reactive({
  name: '',
  capacity: 0,
  location: '',
  item: ''
})
//pageNo
const pageNo = ref(1)
//table
//从后端拉取会议室数据
const table = ref()
const access = localStorage.getItem('access').toString();
const pullList = () => {
  axios.post('http://localhost:3000/meeting/getAll',{
    pageSize: 5,
    pageNo: pageNo.value,
  },{
    headers: {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/x-www-form-urlencoded",
    }
  }).then((res) => {
    table.value = res.data.data;
    ElMessage({
      type: "success",
      message: res.data.message,
    })
    //计算当前数据需要的分页数量
    if (res.data.count === 0) {
      pageNumber.value = 0;
    }
    pageNumber.value = Math.ceil(res.data.count / 5) * 10;
  }).catch((err) => {
    console.log(err)
  })
}
//om
onMounted(() => {
  pullList()
  //refresh token
  setInterval(() => {
    refresh()
  },100000)
})
//current change
const change = ref()
const currentChange = (currentRow) => {
  change.value = currentRow
}
//dialogVisible
const dialogVisible = ref(false)
//controller
const controller = () => {
  dialogVisible.value = true
}
//meeting
const meeting = reactive({
  name: '',
  from: Date,
  to: Date,
  person: '',
  more: ''
})
//预约会议室
async function bookRoom(){
  dialogVisible.value = false
  if (meeting.name && meeting.person && meeting.from && meeting.to){
    await axios.post('http://localhost:3000/booking/add',{
      userId: store.userID,
      roomId: change.value.id,
      note: meeting.more,
      startTime: meeting.from,
      endTime: meeting.to,
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
      ElMessage({
        type: "warning",
        message: '预约错误',
      })
      console.log(err);
    })
  } else {
    ElMessage({
      type: "warning",
      message: '参数不能为空',
    })
  }
}
//fuzzy search room
const fuzzySearch = () => {
  if (search.name || search.item || search.location || search.capacity) {
    axios.post('http://localhost:3000/meeting/search',{
      name: search.name,
      location: search.location,
      capacity: search.capacity,
      equipment: search.item,
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
        message: '错误',
      })
    })
  } else {
    ElMessage({
      type: "warning",
      message: '至少有一个参数不为空'
    })
  }
  if (search.name && search.item && search.location && search.capacity) {
    axios.post('http://localhost:3000/meeting/search',{
      name: search.name,
      location: search.location,
      capacity: search.capacity,
      equipment: search.item,
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
        message: '错误',
      })
    })
  }
}
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- 顶部功能栏 -->
    <div class="w-full h-[100px] relative block z-[199] shadow-sm">
      <el-form
          label-width="auto"
          :inline="true"
          v-model="search"
      >
        <el-form-item label="会议室名称">
          <el-input v-model="search.name" placeholder="请输入会议室名称" clearable />
        </el-form-item>
        <el-form-item label="会议室位置">
          <el-input v-model="search.location" placeholder="请输入会议室位置" clearable />
        </el-form-item>
        <el-form-item>
          <el-button icon="Refresh" type="primary" @click="pullList">刷新</el-button>
        </el-form-item>
        <el-form-item label="会议室人数">
          <el-input v-model="search.capacity" placeholder="请输入会议室人数" clearable />
        </el-form-item>
        <el-form-item label="会议室物品">
          <el-input v-model="search.item" placeholder="请输入会议室物品" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="fuzzySearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格主体 -->
    <div style="height: calc(100% - 140px)" class="w-full relative block">
      <el-table
          :data="table"
          stripe
          highlight-current-row
          @current-change="currentChange"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="会议室名" prop="name" />
        <el-table-column label="会议室人数" prop="capacity" />
        <el-table-column label="会议室地点" prop="location" />
        <el-table-column label="会议室物品" prop="equipment" />
        <el-table-column label="操作">
          <el-button type="text" size="small" @click="controller">预约</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="w-full h-10 relative flex justify-end">
      <el-pagination layout="prev, pager, next" :total=pageNumber />
    </div>
    <!-- 预约弹框 -->
    <el-dialog
        v-model="dialogVisible"
        title="预定会议室"
        width="500"
        draggable
    >
      <div class="w-full h-auto relative block">
        <el-form
            v-model="meeting"
            label-width="auto"
        >
          <el-form-item label="会议室名称">
            <el-input placeholder="会议室名称" clearable v-model="meeting.name" />
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
                v-model="meeting.from"
                type="date"
                placeholder="选择开始时间"
                size="default"
            />
          </el-form-item>
          <el-form-item label="截止时间">
            <el-date-picker
                v-model="meeting.to"
                type="date"
                placeholder="选择截止时间"
                size="default"
            />
          </el-form-item>
          <el-form-item label="参会人员">
            <el-input v-model="meeting.person" clearable placeholder="请输入参会人员" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="meeting.more" clearable placeholder="请输入备注" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="w-full h-auto mx-auto" @click="bookRoom">预约</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>