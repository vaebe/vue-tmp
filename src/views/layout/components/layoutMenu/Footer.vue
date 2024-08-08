<script setup lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'

const layoutStore = useLayoutStore()
const { menuCollapse } = storeToRefs(layoutStore)
const { setMenuCollapse } = layoutStore
</script>

<template>
  <div class="menu-footer">
    <el-icon
      v-if="menuCollapse === false"
      class="cursor-pointer" size="36" color="black"
      @click="setMenuCollapse(true)"
    >
      <Fold />
    </el-icon>
    <el-icon
      v-else
      class="cursor-pointer" size="36" color="black"
      @click="setMenuCollapse(false)"
    >
      <Expand />
    </el-icon>
  </div>
</template>

<style scoped lang="scss">
.menu-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border-top: 1px solid #f5f5f5;
  background: var(--layout-menu-header-bg);
  transition: all 0.3s;
}
</style>
