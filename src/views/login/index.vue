<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { useCountdown } from './composables/useCountdown'
import { getVerificationCode, userLogin, userRegister } from '@/api/login'
import { Encrypt } from '@/utils/password'

const loginForm = reactive({
  email: '',
  password: '',
  code: '',
})

const loginFormRules = reactive<FormRules>({
  email: [
    { required: true, message: '账号不能为空！', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址！', trigger: ['blur', 'change'] },
  ],
  password: [
    { required: true, message: '密码不能为空！', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '验证码不能为空！', trigger: 'blur' },
    { min: 6, max: 6, message: '请输入六位验证码！', trigger: 'blur' },
  ],
})

const loginFormRef = ref<FormInstance>()

const { countdown, startCountdown } = useCountdown()
// 发送验证码
function sendTheVerificationCode() {
  // 获取验证码倒计时大于 0 直接返回
  if (countdown.value > 0)
    return

  // 验证用户账号是否填写正确
  loginFormRef.value?.validateField('email', (valid) => {
    if (valid) {
      // 发送验证码
      getVerificationCode({ email: loginForm.email }).then(() => {
        ElMessage.success('验证码发送成功！')

        // 验证码发送成功开始倒计时
        startCountdown()
      })
    }
    else {
      ElMessage.warning('请检查账号是否填写正确！')
    }
  })
}

const route = useRoute()

// 判断当前是否是登录页面
const isLogin = computed(() => route.path.includes('login'))
const loginButText = computed(() => (isLogin.value ? '登录' : '点击注册'))
const tipsText = computed(() =>
  isLogin.value ? '没有账号，点击注册！' : '已有账号，点击登录！',
)

const router = useRouter()

// 切换页面类型： 登录｜注册
function pageTypeChange() {
  router.push(isLogin.value ? 'register' : 'login')
}

const { setLoginResData } = useUserStore()

// 注册
function register() {
  userRegister(loginForm).then((res) => {
    setLoginResData(res.data)
    ElMessage.success('注册成功！')
  })
}

// 登录
function login() {
  const opts = cloneDeep(loginForm)

  // 对密码进行加密
  opts.password = Encrypt(loginForm.password)

  userLogin(opts).then((res) => {
    setLoginResData(res.data)
    ElMessage.success('登录成功！')
  })
}

// 登录或者注册
function loginOrRegister() {
  loginFormRef.value?.validate((val) => {
    if (val) {
      if (isLogin.value) {
        login()
      }
      else {
        register()
      }
    }
    else {
      ElMessage.warning('请检查表单是否填写正确！')
    }
  })
}
</script>

<template>
  <div class="login-box flex items-center justify-center">
    <div class="login-content h-[412px]">
      <div class="w-[275px]  text-white">
        <img src="@/assets/img/login/left-bg.png" alt="" width="100%" height="100%">
      </div>
      <div class="w-[430px] h-full px-8 py-8">
        <h1 class="text-3xl tracking-widest text-white">
          欢迎登录
        </h1>
        <h2 class="mt-2 mb-6 text-sm tracking-widest text-gray-500">
          有些事情总要试一试！
        </h2>
        <el-form
          ref="loginFormRef"
          class="w-full mb-2"
          :model="loginForm"
          :rules="loginFormRules"
          :label-width="0"
          size="large"
        >
          <el-form-item prop="email" label="">
            <el-input v-model="loginForm.email" placeholder="请输入账号" />
          </el-form-item>

          <el-form-item v-if="!isLogin" prop="code" label="">
            <el-input v-model="loginForm.code" placeholder="请输入验证码">
              <template #append>
                <span v-if="countdown" class="cursor-pointer">
                  {{ countdown }}s
                </span>
                <span v-else class="cursor-pointer" @click="sendTheVerificationCode">
                  验证码
                </span>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password" label="">
            <el-input v-model="loginForm.password" show-password placeholder="请输入密码" type="password" />
          </el-form-item>
        </el-form>

        <el-button type="primary" size="large" round class="login-but w-full" @click="loginOrRegister">
          {{ loginButText }}
        </el-button>

        <p
          class="mt-4 text-sm text-gray-300 cursor-pointer hover:text-blue-400 text-center"
          @click="pageTypeChange"
        >
          {{ tipsText }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/img/login/bg.jpg') no-repeat center;
  background-size: 100% 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
    backdrop-filter: blur(6px);
    background: rgba(0, 0, 0, 0.7);
  }

  .login-content {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    min-width: 680px;
    overflow: hidden;
    border-radius: 12px;
    border: 1px solid;
    border-color: #1e3139;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(
        252.37deg,
        #1b262b 0.55%,
        #171b21,
        #191d23 90.08%
      ),
      linear-gradient(
        68.56deg,
        #1e2930 29.44%,
        #1d1d1d 59.6%,
        #262a2f 82.91%,
        #2e4141 101.21%
      );
  }
}
</style>

<style lang="scss">
.login-content {
  .el-input--large .el-input__wrapper {
    --el-input-border-radius: 12px;
    padding: 4px 15px;
    transition: all 0.1s;
    background: #0d1116;
    border: transparent;
    box-shadow: none;
    color: #fff;
    width: 100%;
  }

  .el-input__inner {
    color: #fff;
  }

  .el-input-group__append {
    background: transparent;
    border: transparent;
    box-shadow: none;
    background: #0d1116;
    border-radius: 0 12px 12px 0;
    color: #72e528;
  }

  .login-but {
    color: #0d1116;
    background: linear-gradient(89.86deg, #82fac2, #47d4ff);
  }
}
</style>
