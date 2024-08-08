<script setup lang="ts">
const { menuCollapse } = storeToRefs(useLayoutStore())

const router = useRouter()
function jumpHome() {
  router.push('/user')
}
</script>

<template>
  <div class="menu-header" @click="jumpHome">
    <div class="menu-header__icon">
      <img src="/logo.svg" alt="logo">
    </div>
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
  color: black;
  background: var(--layout-menu-header-bg);
  border-bottom: 1px solid #f5f5f5;

  &__icon {
    width: 38%;
    height: 38px;
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
