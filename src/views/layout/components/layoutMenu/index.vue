<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import type { RouteRecordRaw } from 'vue-router'

const MenuHeader = defineAsyncComponent(() => import('./Header.vue'))
const MenuFooter = defineAsyncComponent(() => import('./Footer.vue'))

const { menuCollapse } = storeToRefs(useLayoutStore())

const router = useRouter()
const routes = router?.getRoutes() || []
const menuDataList = routes.find(item => item.path === '/')?.children || []

function formatMenuData(
  basePath: string,
  list: Array<RouteRecordRaw>,
): Array<RouteRecordRaw> {
  const data = list
  return data.map((item) => {
    const path = `${basePath}${item.path}`

    let children: Array<RouteRecordRaw> = []
    if (Array.isArray(item.children))
      children = formatMenuData(`${path}/`, item.children)

    return {
      ...item,
      path,
      children,
    } as RouteRecordRaw
  })
}

const menuTreeData = ref(formatMenuData('/', menuDataList))

const route = useRoute()
const defaultActiveMenu = computed(() => {
  const list = route.matched
  return list[list.length - 1].path
})
</script>

<template>
  <div class="menu-box">
    <MenuHeader />

    <el-scrollbar style="height: calc(100vh - 98px)">
      <el-menu
        router
        :default-active="defaultActiveMenu"
        background-color="transparent"
        :unique-opened="true"
        :collapse-transition="false"
        :collapse="menuCollapse"
      >
        <template v-for="item in menuTreeData" :key="item.path">
          <!-- 有子路由  -->

          <el-sub-menu v-if="item.children && item.children.length !== 0" :index="item.path">
            <template #title>
              <Icon :icon="item.meta!.icon" width="18px" height="18px" class="mr-0.5" />
              <span>{{ item.meta?.title }}</span>
            </template>

            <el-menu-item
              v-for="subItem in item.children"
              :key="subItem.path"
              :index="subItem.path"
            >
              <span>{{ subItem.meta?.title }}</span>
            </el-menu-item>
          </el-sub-menu>

          <!-- 无子路由 -->
          <el-menu-item v-else :index="item.path">
            <Icon :icon="item.meta!.icon" width="18px" height="18px" class="mr-0.5" />
            <template #title>
              <span>
                {{ item.name }}
              </span>
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>

    <MenuFooter />
  </div>
</template>

<style lang="scss" scoped>
.menu-box {
  width: var(--layout-menu-width);
  height: 100vh;
  background: var(--layout-menu-bg);
  border-right: transparent;
  transition: all 0.3s;
}

.menu-icon {
  width: 18px;
  height: 18px;
  margin-right: 4px;
}
</style>
