import request from '@/utils/request'

// 获取文章分类内容
export const artGetChannelsService = () => {
  request.get('/my/cate/list')
}

// 添加文章分类
export const artAddChannelsService = (data) => {
  request.post('/my/cate/add', data)
}

// 编辑文章分类内容
export const artEditChannelsService = (data) => {
  request.put('/my/cate/info', data)
}

// 删除文章分类内容
export const artDelChannelsService = (id) => {
  request.delete('/my/cate/del', {
    params: { id },
  })
}

// 文章内容有关
export const artGetListService = (params) => {
  request.get('/my/article/list', { params })
}

// 文章发布
export const artPublishService = (data) => {
  request.post('/my/article/add', data)
}

// 文章回显
export const artGetDetailService = (id) => {
  request.get('/my/article/info', { params: { id } })
}

// 文章编辑
export const artEditService = (data) => {
  request.put('/my/article/info', data)
}

// 文章删除
export const artDelService = (id) => {
  request.delete('my/article/info', { params: { id } })
}
