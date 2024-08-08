<script lang="ts" setup>
import LayoutMenu from '@/views/layout/components/layoutMenu/index.vue'
import LayoutHeader from '@/views/layout/components/layoutHeader/index.vue'
</script>

<template>
  <div class="base-layout">
    <LayoutMenu />

    <div>
      <LayoutHeader />
      <div class="base-layout__content-box">
        <el-scrollbar height="calc(100vh - 58px)">
          <div style="margin: 18px">
            <router-view />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;

  &__content-box {
    box-sizing: border-box;
    width: calc(100vw - var(--layout-menu-width));
    height: calc(100vh - 58px);
    background: rgb(245, 246, 249);
  }
}
</style>
