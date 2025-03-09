import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './useUserStore'

export enum Role {
  teacher = 'teacher',
  student = 'student',
}

export interface MenuItem {
  url: string
  text: string
  openType: 'reLaunch' | 'switchTab'
  icon: string
  selectIcon: string
}

const teachingMenus: MenuItem[] = [
  {
    url: '/pages/app/home/index',
    text: '主页',
    openType: 'reLaunch',
    icon: '/static/tabBar/course.png',
    selectIcon: '/static/tabBar/course-selected.png',
  },
  {
    url: '/pages/mine/index',
    text: '我的',
    openType: 'switchTab',
    icon: '/static/tabBar/course.png',
    selectIcon: '/static/tabBar/course-selected.png',
  },
]

const learningMenus: MenuItem[] = [
  {
    url: '/pages/app/home/index',
    text: '主页',
    openType: 'reLaunch',
    icon: '/static/tabBar/course.png',
    selectIcon: '/static/tabBar/course-selected.png',
  },
  {
    url: '/pages/mine/index',
    text: '我的',
    openType: 'switchTab',
    icon: '/static/tabBar/course.png',
    selectIcon: '/static/tabBar/course-selected.png',
  },
]

export const useTabBarStore = defineStore('tabBar', () => {
  const userStore = useUserStore()
  const hideNativeTabbar = ref<boolean>(false)
  const isShowTabBar = ref<boolean>(false)
  const current = ref<number>(0)
  const menus = ref<MenuItem[]>(teachingMenus)

  function toggleShowTabBar(path: string): void {
    isShowTabBar.value = menus.value.some(menu => menu.url === `/${path}`)
  }

  function hideTabBar(): void {
    isShowTabBar.value = false
  }

  function showTabBar(): void {
    isShowTabBar.value = true
  }

  function switchTab(index: number): void {
    current.value = index
  }

  function setHideNativeTabbar(val: boolean): void {
    hideNativeTabbar.value = val
  }

  function setMenus(role: Role): void {
    menus.value = role === Role.teacher ? teachingMenus : learningMenus
    uni.setStorageSync('role', role)
  }

  function initTabBar(): void {
    const role = userStore.getUserRole()
    setMenus(role)
  }

  return {
    // state
    hideNativeTabbar,
    menus,
    current,
    isShowTabBar,
    // actions
    toggleShowTabBar,
    setHideNativeTabbar,
    hideTabBar,
    showTabBar,
    switchTab,
    setMenus,
    initTabBar,
  }
})
