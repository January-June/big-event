// import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  // 配置history模式（地址栏不带#）
  // import.meta.env.BASE_URL是vite中的路由基准地址 vite.config.js中的base
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutPage.vue'),
      redirect: '/article/manage',
      children: [
        { path: '/article/manage', component: () => import('@/views/article/ArticleManage.vue') },
        { path: '/article/channel', component: () => import('@/views/article/ArticleChannel.vue') },
        { path: '/user/profile', component: () => import('@/views/user/UserProfile.vue') },
        { path: '/user/avatar', component: () => import('@/views/user/UserAvatar.vue') },
        { path: '/user/password', component: () => import('@/views/user/UserPassword.vue') },
      ],
    },
  ],
})

// 登录访问拦截
// 根据返回值决定是否拦截
// 返回值：
// undefined/true--直接放行
// false--拦回from的地址
// 具体路径/路径对象--拦截到对应路径
// router.beforeEach((to) => {
//   const userStore = useUserStore()
//   // 如果没有token 且访问的登录页面--拦截到登录页
//   // 其他情况正常放行
//   if(!userStore.token && to.path !== '/login')
//     return '/login'
// })

export default router
