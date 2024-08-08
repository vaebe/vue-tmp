<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const navList = computed(() => {
  const list = route.matched.map((item) => {
    return {
      name: item.name,
      meta: item.meta,
      path: item.path,
    }
  })

  const len = list.length

  return list.splice(len > 3 ? 2 : 1, len - 1)
})

const router = useRouter()
function jumpPage(path: string) {
  router.push(path)
}
</script>

<template>
  <ul class="nav-list">
    <li v-for="(item, index) in navList" :key="item.name" class="nav-list__item" @click="jumpPage(item.path)">
      <span v-if="index" class="mx-2">/</span> {{ item.meta?.title }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.nav-list {
  display: flex;
  align-items: center;

  &__item {
    font-size: 18px;
    color: var(--el-text-color-primary);
    cursor: pointer;

    &:last-of-type {
      color: var(--el-text-color-regular);
    }
  }
}
</style>
