<script setup>
import { reactive } from "vue";
import { onMounted } from "vue";
import * as echarts from 'echarts';
//form
const topForm = reactive({
  start: '',
  end: '',
  type: ''
})
//charts
onMounted(() => {
  const charts = echarts.init(document.getElementById('charts'))
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'left'
    },
    series: [
      {
        name: '基础环图',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
  charts.setOption(option);
})
</script>

<template>
  <div class="w-full h-full relative block overflow-hidden">
    <!-- 顶部功能栏 -->
    <div class="w-full h-[100px] relative pt-2 block overflow-hidden">
      <el-form
          :inline="true"
          label-width="auto"
          v-model="topForm"
      >
        <el-form-item label="开始时间">
          <el-input v-model="topForm.start" placeholder="请输入开始时间" clearable />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-input v-model="topForm.end" placeholder="请输入结束时间" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search">搜索</el-button>
        </el-form-item>
        <el-form-item label="图表类型">
          <el-input v-model="topForm.type" placeholder="请输入图标类型" clearable />
        </el-form-item>
      </el-form>
    </div>
    <!-- echarts图表 -->
    <div style="height: calc(100% - 100px)" class="w-full relative flex justify-center overflow-hidden">
      <div class="w-[400px] h-[400px] relative my-auto block">
        <el-card class="w-full h-full">
          <div id="charts" class="w-full h-[400px] relative block">

          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style>
.el-card .el-card__body {
  padding: 0;
}
</style>