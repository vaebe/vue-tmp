<template>
  <div class="layout-box">
    <Header></Header>
    <div class="content-box">
      <Menu></Menu>
      <div class="main-box">
        <el-scrollbar height="91vh">
          <div style="margin: 18px">
            <router-view />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/views/layout/components/BaseHeader.vue';
import Menu from '@/views/layout/components/BaseMenu.vue';
</script>

<style lang="scss" scoped>
.layout-box {
  width: 100vw;
  height: 100vh;
  background: var(--el-bg-color-overlay);

  .content-box {
    display: flex;

    .main-box {
      box-sizing: border-box;
      width: calc(100vw - 240px);
      height: calc(100vh - 7vh);
    }
  }
}
</style>
