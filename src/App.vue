<script setup>
import { useRoute, useRouter } from 'vue-router'

import { useUserStore } from './stores/index'
const router = useRouter()
const route = useRoute()

const userStore = useUserStore()

const goIndex = () => {
  console.log(route, router)
}
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
  <hr>
  <div>APP</div>
  <el-button @click="goIndex">跳转首页</el-button>
  <el-button @click="$router.push('/list')">跳转列表</el-button>

  <p>{{ userStore.token }}</p>
  <el-button @click="userStore.setToken('asdfghjkl')" type="primary">模拟登录</el-button>
  <el-button @click="userStore.removeToken()" type="primary">模拟退出</el-button>
</template>

<style scoped></style>
