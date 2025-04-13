<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
// import { artGetListService } from '@/api/article'
// 日期格式化
import { formatTime } from '@/utils/format'
// 假数据
const articleList = ref([
  {
    id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育',
  },
  {
    id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: null,
    cate_name: '体育',
  },
])

// 父组件传递给子组件
const params = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前页生效的条数
  cate_id: '',
  state: '',
})
// 动态渲染
// const articleList = ref([])
// const total = ref(0)

// const getArticleList = async () => {
//   loading.value = true
//   const res = await artGetListService(params.value)
//   articleList.value = res.data.data
//   total.value = res.data.total
//   loading.value = false
// }
// getArticleList()

// 删除文章
const onDeleteArticle = (row) => {
  console.log(row)
}

// 分页逻辑
const onSizeChange = (size) => {
  params.value.pagenum = 1
  params.value.pagesize = size
  // getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  // getArticleList()
}

// loading效果
const loading = ref(false)

// 搜索逻辑--按照最新条件从第一页开始展示
const onSearch = () => {
  params.value.pagenum = 1
  console.log('触发搜索')
  // getArticleList()
}
// 重置逻辑
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  console.log('触发重置')
  // getArticleList()
}

// 控制抽屉组件
const articleEditRef = ref()
// 发布文章
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑文章
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary">发布文章</el-button>
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 内容区域 -->
    <el-table v-loading="loading" :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" width="400">
        <!-- 链接高亮效果--type="primary"默认是蓝色 -->
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">{{ formatTime(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <!-- 利用作用域插槽row可以获取当前行的数据(更灵活) => v-for 遍历item -->
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- 分页区域 -->
    <!-- page-sizes必须包含params中的pagesize -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :size="size"
      :background="background"
      layout="jumper, total, sizes, prev, pager, next"
      :total="10"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />

    <!-- 抽屉区域 -->
    <article-edit ref="articleEditRef"></article-edit>

  </page-container>
</template>
