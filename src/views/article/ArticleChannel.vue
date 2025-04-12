<script setup>
// import { artGetChannelsService } from '@/api/article';
// import{ ref} from 'vue'

// const channelList = ref([])

// const getChannelList = async () => {
//   loading.value = true
//   const res = await artGetChannelsService()
//   channelList.value = res.data.data
//   loading.value = false
//   console.log(res.data.data)
// }

// getChannelList()
import { Edit, Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelEdit from './components/ChannelEdit.vue'
// import { ElMessage, ElMessageBox } from 'element-plus'
// import { artDelChannelsService } from '@/api/article'
// 控制加载变量
const loading = ref(false)
// 控制弹窗变量
const dialog = ref()

const channelList = [
  {
    cate_name: '2016',
    cate_alias: 'Tom',
  },
  {
    cate_name: '2017',
    cate_alias: 'To',
  },
  {
    cate_name: '2018',
    cate_alias: 'T',
  },
]

const onAddChannel = () => {
  dialog.value.open()
}
const onEditChannel = (row) => {
  // console.log(row)
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  console.log(row)
  // await ElMessageBox.confirm('您确认删除该分类信息吗？', '温馨提示', {
  //   type: 'warning',
  //   confirmButtonText: '确认',
  //   cancelButtonText: '取消'
  // })
  // await artDelChannelsService(row.id)
  // ElMessage({
  //   type: 'success',
  //   message: '删除成功',
  //   // getChannelList()
  // })
}

// 监听子组件成功消息
const onSuccess = () => {
  // getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel()" type="primary"> 添加分类 </el-button>
    </template>

    <!-- table表格 -->
    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <!-- 空状态时 -->
      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>

    <!-- 弹框层 -->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
