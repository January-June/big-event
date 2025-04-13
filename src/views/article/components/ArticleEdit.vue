<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
// 富文本编辑器
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artEditService, artGetDetailService, artPublishService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
import axios from 'axios'

const defaultForm = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: '',
}

const formModel = ref({
  ...defaultForm,
})

// 控制抽屉
const visibleDrawer = ref(false)

// 图片上传
const imageUrl = ref('')
const editorRef = ref()
const onUploadFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw) //预览图片
  formModel.value.cover_img = uploadFile.raw // 存入，之后用于正式提交
}

const open = async (row) => {
  visibleDrawer.value = true
  // console.log(row)
  if (row.id) {
    console.log('编辑回显')
    const res = await artGetDetailService(row.id)
    formModel.value = res.data.data
    // 图片回显： 需要拼接基地址+图片地址
    imageUrl.value = baseURL + formModel.value.cover_img

    // 根据接口文档要求：提交给后台需要file格式，将网络图片转换成file格式
    formModel.value.cover_img = await imageUrlToFile(
      imageUrl.value,
      formModel.value.cover_img
    )
  } else {
    // 封装formModel的作用，方便初始化清空与重置，也可以不封装，要写两遍
    console.log('添加回显')
    ;(formModel.value = { ...defaultForm }),
      // 但是图片上传和富文本编辑器内容需要再手动重置
      (imageUrl.value = ''),
      // 根据官网Methods查看
      editorRef.value.setHTML('')
  }
}

// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], { type: response.headers['content-type'] })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}

// 文章发布
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  // 状态存入state
  formModel.value.state = state
  // 当前接口要求，转换成formData数据
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  if (formModel.value.id) {
    console.log('编辑操作')
    await artEditService(fd)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    // 添加请求
    await artPublishService(fd)
    ElMessage.success('添加成功')
    visibleDrawer.value = false
    // 通知父组件，添加成功
    emit('success', 'add')
  }
}


defineExpose({
  open,
})
</script>

<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.cate_id ? '编辑文章' : '添加文章'"
    direction="rtl"
    size="50%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            ref="editorRef"
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
          >
          </QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
