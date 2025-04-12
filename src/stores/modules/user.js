import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'my-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    // 用户信息
    const user = ref({})
    // 获取用户信息
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    // 重置用户信息
    const setUser = (obj) => (user.value = obj)

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: {
      enabled: true, // 本地化
      storage: localStorage
    }
  }
)
