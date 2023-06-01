<template>
  <div class="box">
    <div class="login-title">{{ VITE_APP_TITLE }}</div>
    <div class="user-form-box">
      <el-form ref="formRef" class="user-form" :model="formDataObj" :rules="loginRules">
        <el-form-item label="" prop="username">
          <el-input
            v-model="formDataObj.username"
            :prefix-icon="User"
            max-length="20"
            :autofocus="true"
            autocomplete="off"
            clearable
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="" prop="password">
          <el-input
            v-model="formDataObj.password"
            show-password
            max-length="20"
            clearable
            autocomplete="new-password"
            :prefix-icon="Unlock"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-button
          type="primary"
          class="login-but-style but"
          :loading="loading"
          @click="clickLogin"
        >
          点击登录
        </el-button>

        <div class="test-info">测试账号：admin 密码：123456</div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import loginApi from '@/services/login.ts';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { User, Unlock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { useUserInfo } from '@/store/user-info.ts';

const { VITE_APP_TITLE } = import.meta.env;

const formDataObj = reactive({
  username: '',
  password: ''
});
const loginRules = reactive({
  username: [
    {
      required: true,
      message: '请输入账户',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
});

const loading = ref(false);

const router = useRouter();
const { setUserInfo } = useUserInfo();

const formRef = ref(null);
const clickLogin = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      loginApi
        .login(formDataObj)
        .then((res) => {
          if (res.code - 0 === 0) {
            setUserInfo(res.data);

            router.push({ path: '/demo' });
            ElMessage.success('登录成功！');
          }
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    } else {
      ElMessage.error('您所填写的信息不完整，无法提交！');
      return false;
    }
  });
};
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-image: url('../assets/img/loginBg.jpg');
  background-size: 100% 100%;

  .login-title {
    padding: 12vh 14vw 0 0;
    font-size: 70px;
    color: rgb(31 54 96);
    text-align: right;
    letter-spacing: 4px;
    opacity: 0.9;
    -webkit-box-reflect: below -10px -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(transparent),
        to(rgb(255 255 255 / 20%))
      );
  }

  .user-form-box {
    display: flex;
    justify-content: center;
    padding-top: 28vh;
    margin-left: 5vw;

    .user-form {
      width: 400px;

      .login-but-style {
        width: 400px;
        margin: 0 auto;
      }

      .test-info {
        margin-top: 1vh;
        margin-bottom: 8vh;
        font-weight: normal;
        text-align: center;
      }
    }
  }
}
</style>
