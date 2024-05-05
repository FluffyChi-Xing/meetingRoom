<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { onMounted } from "vue";
import {ElMessage} from "element-plus";
//top data
const topForm = reactive({
  username: '',
  nickName: '',
  email: ''
})
//pageNumber
const pageNumber = ref()
//user table
const userTable = ref()
//pageNo
const pageNo = ref(1)
//pageSize
const pageSize = ref(5)
//拉取用户列表
//分页列表
const pullUsers = () => {
  const accessToken = localStorage.getItem('access').toString();
  axios.post('http://localhost:3000/user/userList',{
    pageNo: pageNo.value,
    pageSize: pageSize.value
  },{
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded",
    }
  }).then((res) => {
    userTable.value = res.data.data.list;
    ElMessage({
      type: "success",
      message: res.data.message,
    })
    if (res.data.data.count === 0) {
      pageNumber.value = 0
    }
    pageNumber.value = Math.ceil(res.data.data.count / 5) * 10;
  }).catch((e) => {
    console.log(e);
  })
}
//分页拉取
const changePage = (current) => {
  pageNumber.value = current
}
//实现表单单选
const currentID = ref()
const handleCurrentChange = (currentRow) => {
  currentID.value = currentRow.id;
}
//用户权限冻结
const frozen = () => {
  const access = localStorage.getItem('access').toString()
  axios.post('http://localhost:3000/user/frozen',{
    id: currentID.value
  }, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access}`,
    }
  }).then((res) => {
    ElMessage({
      type: "success",
      message: res.data.message,
    })
  }).catch((err) => {
    console.log(err);
  })
}
//根据用户名、邮箱、昵称任选其一查询用户
const fuzzySearch = () => {
  //获取accessToken
  const access = localStorage.getItem('access').toString()
  if (topForm.email || topForm.nickName || topForm.username) {
    axios.post('http://localhost:3000/user/fuzzy',{
      email: topForm.email,
      username: topForm.username,
      nickName: topForm.nickName,
    },{
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then((res) => {
      userTable.value = res.data.data;
      ElMessage({
        type: "success",
        message: res.data.message,
      })
    }).catch((e) => {
      console.log(e);
    })
  } else {
    ElMessage({
      type: "warning",
      message: '三个参数不可同时为空',
    })
  }
}
//om
onMounted(() => {
  pullUsers() //拉取用户列表
})
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
          <el-button icon="Search" type="primary" @click="fuzzySearch">搜索</el-button>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="topForm.email" placeholder="请输入昵称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Refresh" @click="pullUsers">刷新</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格主体 -->
    <div style="height: calc(100% - 140px)" class="w-full max-h-[533px] relative block overflow-y-scroll">
      <el-table
          :data="userTable"
          stripe
          highlight-current-row
          @current-change="handleCurrentChange"
      >
        <el-table-column label="id" prop="id" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="密码" prop="password" />
        <el-table-column label="昵称" prop="nickName" />
        <el-table-column label="邮箱" prop="email" />
        <el-table-column label="用户头像" prop="headPic" />
        <el-table-column label="操作">
          <el-button type="text" size="small" @click="frozen">冻结</el-button>
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