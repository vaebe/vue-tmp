<script setup lang="ts">
const { menuCollapse } = storeToRefs(useLayoutStore())

const router = useRouter()
function jumpHome() {
  router.push('/user')
}
</script>

<template>
  <div class="menu-header" @click="jumpHome">
    <img src="/logo.svg" alt="logo" class="menu-header__icon">

    <p v-if="!menuCollapse" class="menu-header__title">
      kk-admin
    </p>
  </div>
</template>

<style scoped lang="scss">
.menu-header {
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-primary);
  border-bottom: 1px solid var(--el-border-color);

  &__icon {
    width: 34px;
    height: 34px;
  }

  &__title {
    margin-left: 14px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
