<script setup lang="ts">
import { useTabBarStore } from '@/stores/useTabBarStore'

const tabBarStore = useTabBarStore()
const { menus } = storeToRefs(tabBarStore)

watch(menus, () => {
  uni.reLaunch({ url: menus.value[0].url })
}, { immediate: true })

onShow(() => {
  tabBarStore.switchTab(0)
  // #ifdef APP-PLUS
  uni.hideTabBar()
  // #endif
})
</script>

<template>
  <view />
</template>
