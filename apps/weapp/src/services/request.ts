/* eslint-disable ts/no-use-before-define */
import { useAuthStore } from '@/stores/useAuthStore'
import { useUserStore } from '@/stores/useUserStore'
import { whiteList } from '@/utils/router-guard'
import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'

export type ServerType = 'teach' | 'study'

let isLogout = false

// 根据用户角色获取不同的 baseURL
function getBaseURL(forceServer?: ServerType): string {
  if (forceServer) {
    return forceServer === 'teach'
      ? import.meta.env.VITE_SERVER
      : import.meta.env.VITE_SERVER
  }

  const userStore = useUserStore()
  return userStore.userInfo?.roleList?.some(role => role.code === 'teacher')
    ? import.meta.env.VITE_SERVER
    : import.meta.env.VITE_SERVER
}

export const alovaInstance = createAlova({
  cacheLogger: false,
  baseURL: getBaseURL(),

  beforeRequest(method) {
    const authStore = useAuthStore()

    // 设置认证头
    if (authStore.token) {
      method.config.headers.authorization = `Bearer ${authStore.token}`
      method.config.headers.token = authStore.token
    }

    // 设置默认 Content-Type
    if (!method.config.headers['Content-Type']) {
      method.config.headers['Content-Type'] = 'application/json'
    }

    // 处理加载状态
    if ((method?.data as any)?.ignore === true) { return }
    uni.showLoading({
      title: '加载中....',
      icon: 'loading',
      mask: true,
    })
  },

  ...AdapterUniapp(),

  responded: {
    onSuccess: async (response, method) => {
      const { statusCode, data: rawData } = response as any
      const { code, msg, payload } = rawData

      if ((method?.data as any)?.ignore === true) {
        return payload
      }

      switch (statusCode) {
        case 401:
          if (!isLogout) {
            const authStore = useAuthStore()
            const currentPage = getCurrentPages().pop()
            const currentPath = currentPage ? `/${currentPage.route}` : ''
            authStore.logout()
            isLogout = true

            // 记录当前页面路径
            if (currentPath && !whiteList.some(path => currentPath.startsWith(path))) {
              uni.redirectTo({
                url: `/pages/common/login/index?redirect=${encodeURIComponent(currentPath)}`,
              })
            }

            // try {
            //   // 尝试刷新 token
            //   const newTokenRes = await authStore.refreshToken()
            //   if (newTokenRes) {
            //     // 重试当前请求
            //     return method.send()
            //   }
            // }
            // catch {
            //   authStore.logout()
            //   isLogout = true
            // }
          }
          break

        case 500:
          await handleError(msg || '网络请求错误')
          break

        default:
          if (code === '0') {
            return payload
          }
          if (msg) {
            await handleError(msg)
          }
          return Promise.reject(rawData)
      }
    },
    onComplete: async () => {
      uni.hideLoading()
    },
  },
})

async function handleError(message: string): Promise<void> {
  uni.hideLoading()
  await new Promise(resolve => setTimeout(resolve, 300))
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 3000,
  })
}

export function switchServer(serverType: ServerType) {
  alovaInstance.options.baseURL = getBaseURL(serverType)
}
