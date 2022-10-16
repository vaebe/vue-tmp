<template>
  <div class="menu-box">
    <el-menu
      router
      :default-active="defaultActiveMenu"
      text-color="#ffffff"
      active-text-color="#36f"
      background-color="transparent"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/demo/queryList">
        <el-icon :size="20">
          <chat-line-square />
        </el-icon>
        <span>查询列表</span>
      </el-menu-item>
      <el-sub-menu index="/demo/map">
        <template #title>
          <el-icon :size="20">
            <list />
          </el-icon>
          <span>地图</span>
        </template>
        <el-menu-item index="/demo/map/gdMap">高德地图</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';
import { List, ChatLineSquare } from '@element-plus/icons-vue';

export default defineComponent({
  components: {
    List,
    ChatLineSquare
  },
  setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    const route = useRoute();
    const defaultActiveMenu = computed(() => {
      const list = route.matched;
      return list[list.length - 1].path;
    });
    return {
      handleOpen,
      handleClose,
      defaultActiveMenu
    };
  }
});
</script>

<style lang="scss" scoped>
.menu-box {
  width: 240px;
  height: calc(100vh - 7vh);
  padding: 2vh 0.3vw 1vh;
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow);
}
</style>
