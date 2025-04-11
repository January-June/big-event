import { createPinia } from 'pinia'
// pinia本地持久化
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import { useUserStore } from '@/stores/modules/user'
// export { useUserStore }

export * from "@/stores/modules/user"
// 接收该模块的所有按需导出
