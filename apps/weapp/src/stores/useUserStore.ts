import type { UserInfoRes } from '@/services/login/type'
import { useAuthService } from '@/services/login'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { usePermissionStore } from './usePermissionStore'

export const useUserStore = defineStore('user', () => {
  // 状态定义
  const userInfo = ref<UserInfoRes | null>(null)

  // 服务实例
  const authService = useAuthService()

  // 用户信息管理
  function setUserInfo(info: UserInfoRes) {
    userInfo.value = info
  }

  function clearUserInfo() {
    userInfo.value = null
    const permissionStore = usePermissionStore()
    permissionStore.clearPermissions()
  }

  async function fetchUserInfo() {
    const info = await authService.getUserInfo()
    if (!info) { throw new Error('获取用户信息失败') }
    setUserInfo(info)

    // 设置权限
    const permissionStore = usePermissionStore()
    permissionStore.setPermissions(info.menuList || [], info.roleList || [])

    return info
  }

  return {
    userInfo,
    fetchUserInfo,
    clearUserInfo,
  }
})
