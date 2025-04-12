<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>

<template>
  <div>
    <!-- 国际化处理 全局设置为中文 -->
    <el-config-provider :locale="zh">
      <router-view />
    </el-config-provider>

    <router-view></router-view>
  </div>
</template>

<style scoped></style>
