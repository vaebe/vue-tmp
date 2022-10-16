<template>
  <el-col class="box">
    <el-col class="contentBox">
      <p>抱歉 404 了 ~</p>
      <p>您好，路径输入有误，请确认后重新输入！</p>
      <p>
        <el-button type="primary" @click="goBack">点击返回上个页面</el-button>
        <el-button type="primary" @click="returnLogin">
          点击返回登陆页面
        </el-button>
      </p>
    </el-col>
  </el-col>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const returnLogin = () => {
  router.push({ path: '/login' });
};
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  background-color: #21212d;

  .contentBox {
    padding-top: 28vh;
    font-size: 28px;
    color: #fff;
    text-align: center;
  }

  .contentBox p {
    margin-top: 35px;
  }
}
</style>
