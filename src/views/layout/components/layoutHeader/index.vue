<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const NavList = defineAsyncComponent(() => import('./NavList.vue'))
const UserMenu = defineAsyncComponent(() => import('./UserMenu.vue'))
const ThemeSwitch = defineAsyncComponent(() => import('@/components/ThemeSwitch.vue'))
</script>

<template>
  <div class="layout-header">
    <NavList />

    <div class="flex justify-end items-center">
      <UserMenu />

      <ThemeSwitch class="ml-2" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100vw - var(--layout-menu-width));
  height: 58px;
  padding: 0 2vw;
  border-bottom: 1px solid #f5f5f5;

  .title {
    display: inline-block;
    color: transparent;
    background: linear-gradient(90deg, #fd9248, #fa1768);
    background-clip: text;
  }
}
</style>
