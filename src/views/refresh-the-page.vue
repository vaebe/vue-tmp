<template>
  <div class="refresh-the-page">
    <p>正在刷新中，请稍后...</p>
  </div>
</template>

<script>
export default {
  name: 'RefreshThePage',
  beforeRouteEnter(to, from, next) {
    const queryLen = Object.keys(to.query).length;

    next((vm) => {
      // 有参数从哪里来回哪里去 加上传递的参数
      // 没有参数直接返回上次的路由
      if (queryLen) {
        vm.$router.push({
          path: from.path,
          query: to.query
        });
      } else {
        vm.$router.go(-1);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.refresh-the-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: url('../assets/img/loginBg.jpg') no-repeat;
  background-size: 100% 100%;
}
</style>
