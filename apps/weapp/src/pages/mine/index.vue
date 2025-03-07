<script lang="ts" setup>
const tabbar = ref(1)
</script>

<template>
  <view>
    <wd-tabbar
      v-model="tabbar"
      fixed
      bordered
      safeAreaInsetBottom
      placeholder
    >
      <wd-tabbar-item title="首页" icon="home" />
      <wd-tabbar-item title="分类" icon="cart" />
      <wd-tabbar-item title="我的" icon="user" />
    </wd-tabbar>
  </view>
</template>
