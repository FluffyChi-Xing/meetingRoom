<script setup>
import { ref } from "vue";
import {onMounted} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";
//access
const access = localStorage.getItem('access').toString()
//pageNo
const pageNo = ref(1)
//table
const table = ref()
const pullList = () => {
  axios.post('http://localhost:3000/booking/pull',{
    pageSize: 5,
    pageNo: pageNo.value,
  },{
    headers: {
      Authorization: `Bearer ${access}`,
    }
  }).then((res) => {
    table.value = res.data.data;
    ElMessage({
      type: "success",
      message: res.data.message,
    })
  }).catch((err) => {
    console.log(err);
  })
}
//om
onMounted(() => {
  pullList()
})
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- 表格主体 -->
    <div style="height: calc(100% - 40px)" class="w-full relative block">
      <el-table
          stripe
          :data="table"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="会议室名" prop="name" />
        <el-table-column label="起止时间" prop="startTime" />
        <el-table-column label="与会人员" prop="person" />
        <el-table-column label="备注" type="expand">
          <template #default="props">
            <div class="w-full h-auto p-4 whitespace-pre-line overflow-hidden text-ellipsis text-black">
              {{ props.row.more}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template #default="props">
            <el-progress :percentage="props.row.sign">
              <span>{{props.row.sign === 100 ? '批准' : '审核中'}}</span>
            </el-progress>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="text" size="small">撤销预定</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="flex w-full h-10 relative overflow-hidden justify-end">
      <el-pagination layout="prev, pager, next" :total="50" />
    </div>
  </div>
</template>

<style scoped>

</style>