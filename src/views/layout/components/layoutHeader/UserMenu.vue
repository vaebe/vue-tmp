<script setup lang="ts">
import { getAssetsImgFile } from '@/utils/tool'

const userStore = useUserStore()
const { loginResData } = storeToRefs(userStore)
const { loginOut } = userStore

const APP_VERSION = __APP_VERSION__

const userAvatar = ref(loginResData.value?.userInfo?.avatar)
function loadAvatarError() {
  userAvatar.value = getAssetsImgFile('mascot.png')
}
</script>

<template>
  <el-popover placement="bottom" trigger="click">
    <template #reference>
      <div class="cursor-pointer flex items-center">
        <el-avatar :src="userAvatar" :size="30" @error="loadAvatarError" />

        <div class="text-sm hover:text-primary pl-2">
          <p>{{ loginResData?.userInfo?.nickName }}</p>

          <p class="text-xs text-primary bg-primary-50 rounded px-0.5 inline-block">
            管理员
          </p>
        </div>
      </div>
    </template>
    <ul class="text-center space-y-2">
      <li class="cursor-pointer hover:text-blue-400" @click="loginOut">
        退出
      </li>
      <li class="cursor-pointer hover:text-blue-400">
        V {{ APP_VERSION }}
      </li>
    </ul>
  </el-popover>
</template>

<style scoped lang="scss">

</style>
