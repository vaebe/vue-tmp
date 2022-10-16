<template>
  <div class="header-box">
    <div class="title-box">
      <p>{{ VITE_APP_TITLE }}</p>
    </div>

    <div class="right-box">
      <el-button @click="toggleDark()">
        {{ isDark ? '深夜' : '黎明' }}
      </el-button>

      <div class="login-out">
        <el-icon
          color="red"
          :size="28"
          style="margin-right: 10px"
          @click="loginOut"
        >
          <circle-close />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import login from '@/services/login';
import { ElMessage } from 'element-plus';
import { CircleClose } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';

const { VITE_APP_TITLE } = import.meta.env;

const router = useRouter();

const loginOut = () => {
  login.loginOut().then((res) => {
    if (res.code === 0) {
      ElMessage.success('退出登录成功！');
      router.push({ path: '/login' });
    }
  });
};

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style lang="scss" scoped>
.header-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 7vh;
  color: var(--el-text-color-regular);
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow);

  .title-box {
    margin-left: 1vw;
    font-size: 24px;
    font-weight: bold;
  }

  .right-box {
    display: flex;
    justify-content: flex-end;
    padding-right: 60px;

    .login-out {
      position: absolute;
      right: 0;
    }
  }
}
</style>
