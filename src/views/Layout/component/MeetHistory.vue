<script setup>
import { ref } from "vue";
//table
const table = ref([
  {
    id: 1,
    name: '一号',
    fromTo: '2024-08-12~2024-08-13',
    person: '张三',
    more: 'BIOS是英文"Basic Input Output System"的缩略词，' +
        '直译过来后中文名称就是"基本输入输出系统"。在IBM PC兼容系统上' +
        '，是一种业界标准的固件接口。 [1]BIOS这个字眼是在1975年第一次由' +
        'CP/M操作系统中出现。 [2]BIOS是个人电脑启动时加载的第一个软件。',
    value: 50
  },
  {
    id: 2,
    name: '一号',
    fromTo: '2024-08-12~2024-08-13',
    person: '王五',
    more: 'BIOS是英文"Basic Input Output System"的缩略词，' +
        '直译过来后中文名称就是"基本输入输出系统"。在IBM PC兼容系统上' +
        '，是一种业界标准的固件接口。 [1]BIOS这个字眼是在1975年第一次由' +
        'CP/M操作系统中出现。 [2]BIOS是个人电脑启动时加载的第一个软件。',
    value: 100
  },
  {
    id: 3,
    name: '二号',
    fromTo: '2024-08-12~2024-08-13',
    person: '张三',
    more: 'BIOS是英文"Basic Input Output System"的缩略词，' +
        '直译过来后中文名称就是"基本输入输出系统"。在IBM PC兼容系统上' +
        '，是一种业界标准的固件接口。 [1]BIOS这个字眼是在1975年第一次由' +
        'CP/M操作系统中出现。 [2]BIOS是个人电脑启动时加载的第一个软件。',
    value: 50
  },
  {
    id: 4,
    name: '三号',
    fromTo: '2024-08-12~2024-08-13',
    person: '李四',
    more: 'BIOS是英文"Basic Input Output System"的缩略词，' +
        '直译过来后中文名称就是"基本输入输出系统"。在IBM PC兼容系统上' +
        '，是一种业界标准的固件接口。 [1]BIOS这个字眼是在1975年第一次由' +
        'CP/M操作系统中出现。 [2]BIOS是个人电脑启动时加载的第一个软件。',
    value: 100
  }
])
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
        <el-table-column label="起止时间" prop="fromTo" />
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
            <el-progress :percentage="props.row.value">
              <span>{{props.row.value === 100 ? '批准' : '审核中'}}</span>
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