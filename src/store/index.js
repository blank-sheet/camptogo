import { defineStore } from 'pinia'
import { ElLoading } from 'element-plus'
export const useStore = defineStore('global', {
  state: () => {
    return {
      // 用户登录后的数据
      userInfo: null,
      isLoading: false
    }
  },
  actions: {
    setUserInfo(userInfo) {
      window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
      this.userInfo = userInfo
    },
    setLoading(isLoading = false) {
      this.isLoading = isLoading
    }
  },
  getters: {
    user() {
      return this.userInfo || JSON.parse(window.localStorage.getItem('userInfo'))
    },
    providerId() {
      return this.user?.provider?.id || null
    }
  }
})
