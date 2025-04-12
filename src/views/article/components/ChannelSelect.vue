<script setup>
// import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})

const emit = defineEmits(['update:modelValue'])
const channelList = ref([])
// const getChannelList = async () => {
  // const res = await artGetChannelsService()
  // channelList.value = res.data.data
// }
// getChannelList()
</script>
<template>
  <!-- 注意vue中 v-model是 :value和@input的简写 -->
   <!-- 但是vue3中 v-model是 :modelValue和@update: modelValue的简写 -->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
