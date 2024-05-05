<script setup>
import { reactive, ref } from "vue";
import {onMounted} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
//top form
const topForm = reactive({
  personName: '',
  time: '',
  location: '',
  roomName: ''
})
//table data
const table = ref([
  {
    id: 1,
    person: '张三',
    bookPerson: '李四',
    time: '2024-03-12~2024-03-13',
    roomName: '会议室一',
    more: 'sncasncpiacnoasbvouebvuieivnwoivoeiwnviewnoiwenucbevneiwvneinvienveivnienvbnb'
  },
  {
    id: 2,
    person: '张三',
    bookPerson: '李四',
    time: '2024-03-12~2024-03-13',
    roomName: '会议室一',
    more: 'sncasncpiacnoasbvouebvuieivnwoivoeiwnviewnoiwenucbevneiwvneinvienveivnienvbnb'
  },
  {
    id: 3,
    person: '张三',
    bookPerson: '李四',
    time: '2024-03-12~2024-03-13',
    roomName: '会议室一',
    more: 'sncasncpiacnoasbvouebvuieivnwoivoeiwnviewnoiwenucbevneiwvneinvienveivnienvbnb'
  },
  {
    id: 4,
    person: '张三',
    bookPerson: '李四',
    time: '2024-03-12~2024-03-13',
    roomName: '会议室一',
    more: 'sncasncpiacnoasbvouebvuieivnwoivoeiwnviewnoiwenucbevneiwvneinvienveivnienvbnb'
  }
])
//pageNo
const pageNo = ref(1)
//access
const access = localStorage.getItem('access').toString()
//current pageNumber
const pageNumber = ref()
//pull table
const pullTable = () => {
  axios.post('http://localhost:3000/booking/pull',{
    pageSize: 5,
    pageNo: pageNo.value,
  },{
    headers: {
      Authorization: `Bearer ${access}`
    }
  }).then((res) => {
    table.value = res.data.data;
    if (res.data.count === 0) {
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
//changePage
const changePage = (current) => {
  pageNo.value = current
  axios.post('http://localhost:3000/booking/pull',{
    pageSize: 5,
    pageNo: pageNo.value,
  },{
    headers: {
      Authorization: `Bearer ${access}`
    }
  }).then((res) => {
    table.value = res.data.data;
  }).catch((err) => {
    console.log(err)
    ElMessage({
      type: "warning",
      message: '错误'
    })
  })
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
          label-width="auto"
          v-model="topForm"
      >
        <el-form-item label="预订人">
          <el-input v-model="topForm.personName" placeholder="请输入预订人" clearable />
        </el-form-item>
        <el-form-item label="会议室名称">
          <el-input v-model="topForm.roomName" placeholder="请输入会议室名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索申请</el-button>
        </el-form-item>
        <el-form-item label="预定时间">
          <el-input v-model="topForm.time" placeholder="请输入预定时间" clearable />
        </el-form-item>
        <el-form-item label="会议室位置">
          <el-input v-model="topForm.location" placeholder="请输入会议室位置" clearable />
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格主体 -->
    <div style="height: calc(100% - 140px)" class="max-h-[533px] w-full relative block overflow-y-scroll">
      <el-table
          stripe
          :data="table"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="预定状态" prop="status" />
        <el-table-column label="会议室名" prop="id" />
        <el-table-column label="开始时间" prop="startTime" />
        <el-table-column label="截止时间" prop="endTime" />
        <el-table-column label="备注" type="expand">
          <template #default="props">
            <div class="w-full h-full relative block p-4 whitespace-pre-line text-ellipsis overflow-hidden">
              {{ props.row.note }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <el-button type="text" size="small">通过</el-button>
          <el-button type="text" size="small">驳回</el-button>
          <el-button type="text" size="small">解除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 底部分页器 -->
    <div class="w-full h-10 relative flex justify-end">
      <el-pagination @current-change="changePage" layout="prev, pager, next" :total=pageNumber />
    </div>
  </div>
</template>

<style scoped>

</style>