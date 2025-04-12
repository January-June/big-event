<script setup>
import { artAddChannelsService, artEditChannelsService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
const dialogVisible = ref(false)

// 组件对外暴露方法open，基于open传来的参数区分添加还是编辑
const open = async (row) => {
  dialogVisible.value = true
  console.log(row)
  // 展开运算符...
  formModel.value = { ...row } // 添加--重置表单数据，编辑--回显存储的表单数据
}
// 组件对外暴露方法open
defineExpose({
  open,
})

// 表单内容
const formModel = ref({
  cate_name: '',
  cate_alias: '',
})

// 表单校验
const myrules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '必须是1-10位的非空字符',
      trigger: 'blur',
    },
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-z0-9]{1,10}$/,
      message: '必须是1-10位的字母数字',
      trigger: 'blur',
    },
  ],
}

// 表单提交
// ref用于获取表单组件
const formRef = ref()
const onSubmit = async () => {
  // 先进行表单预提交
  // 根据后端接口知编辑时需携带id参数
  await formRef.value.validate()
  formModel.value.id
  ? await artEditChannelsService(formModel.value)
  : await artAddChannelsService(formModel.value)
  ElMessage({
    type: 'success',
    message: formModel.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false
  emit('success')
}

// 子传父, success事件
const emit =defineEmits(['success'])
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.cate_name ? '编辑分类' : '添加分类'" width="30%">
    <el-form ref="formRef" :model="formModel" :rules="myrules" label-width="100px" style="padding-right: 30px">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" minlength="1" maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" minlength="1" maxlength="10"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button @click="onSubmit()" type="primary"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
