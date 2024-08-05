<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { getVerificationCode, userLogin, userRegister } from '@/api/login'
import { Encrypt } from '@/utils/password'

// 浅色主题
const mode = useColorMode({
  attribute: 'class',
})
mode.value = 'light'

const { VITE_APP_TITLE } = import.meta.env

// 验证码倒计时
const captchaCountdown = ref(0)

// 验证码的定时器
let captchaCountdownTimer = 0
// 清除获取验证码的定时器
function clearCaptchaCountdownTimer() {
  window.clearInterval(captchaCountdownTimer)
}

// 开始倒计时
function startCaptchaCountdown() {
  captchaCountdown.value = 60

  // 开始定时器
  captchaCountdownTimer = window.setInterval(() => {
    captchaCountdown.value -= 1
    // 缓存倒计时
    localStorage.setItem('captchaCountdown', `${captchaCountdown.value}`)

    // 倒计时小于 1 赋值 0 并清除定时器
    if (captchaCountdown.value < 1) {
      captchaCountdown.value = 0
      clearCaptchaCountdownTimer()
    }
  }, 1000)
}

onMounted(() => {
  // 获取缓存的倒计时
  const storeCaptchaCountdown = Number.parseInt(
    window.localStorage.getItem('captchaCountdown') || '0',
  )
  captchaCountdown.value = storeCaptchaCountdown

  // 缓存的倒计时不等于 0 时继续进行倒计时
  if (storeCaptchaCountdown !== 0)
    startCaptchaCountdown()
})

// 页面销毁前清除定时器
onBeforeUnmount(() => {
  clearCaptchaCountdownTimer()
})

const { setLoginResData } = useUserStore()

const loginForm = reactive({
  userAccount: '',
  password: '',
  code: '',
})

const loginFormRules = reactive<FormRules>({
  userAccount: [
    {
      required: true,
      message: '账号不能为空！',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: '请输入正确的邮箱地址！',
      trigger: ['blur', 'change'],
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空！',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '验证码不能为空！',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 6,
      message: '请输入六位验证码！',
      trigger: 'blur',
    },
  ],
})

const loginFormRef = ref<FormInstance>()

// 发送验证码
function sendTheVerificationCode() {
  // 获取验证码倒计时大于 0 直接返回
  if (captchaCountdown.value > 0)
    return

  // 验证用户账号是否填写正确
  loginFormRef.value?.validateField('userAccount', (valid) => {
    if (valid) {
      // 发送验证码
      getVerificationCode({ email: loginForm.userAccount }).then(() => {
        ElMessage.success('验证码发送成功！')

        // 验证码发送成功开始倒计时
        startCaptchaCountdown()
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
  // 校验表单数据是否填写正确，正确调用对应的函数，错误则进行提示
  loginFormRef.value?.validate((val) => {
    if (val)
      isLogin.value ? login() : register()
    else
      ElMessage.warning('请检查表单是否填写正确！')
  })
}
</script>

<template>
  <div class="login-box flex items-center justify-center">
    <div class="w-[360px] flex flex-col items-center">
      <h1 class="text-4xl tracking-widest text-white">
        {{ VITE_APP_TITLE }}
      </h1>
      <h2 class="mt-4 mb-6 text-sm tracking-widest text-gray-400">
        有些事情总要试一试！
      </h2>
      <el-form
        ref="loginFormRef"
        class="w-full py-4 px-2 mb-2 rounded-sm bg-gray-50"
        :model="loginForm"
        :rules="loginFormRules"
        :label-width="isLogin ? '52px' : '70px'"
      >
        <el-form-item prop="userAccount" label="账号">
          <el-input v-model="loginForm.userAccount" />
        </el-form-item>

        <el-form-item v-if="!isLogin" prop="code" label="验证码:">
          <el-input v-model="loginForm.code" placeholder="请输入验证码">
            <template #append>
              <span v-if="captchaCountdown" class="cursor-pointer">
                {{ captchaCountdown }}s
              </span>
              <span
                v-else
                class="cursor-pointer"
                @click="sendTheVerificationCode"
              >
                验证码
              </span>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input
            v-model="loginForm.password"
            show-password
            type="password"
          />
        </el-form-item>
      </el-form>

      <el-button type="primary" class="w-full" @click="loginOrRegister">
        {{ loginButText }}
      </el-button>

      <p
        class="mt-4 text-sm text-gray-300 cursor-pointer hover:text-blue-400"
        @click="pageTypeChange"
      >
        {{ tipsText }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/img/login-bg.jpg') no-repeat center;
  background-size: 100% 100%;
}
</style>
