import type { ResultData } from './base'
import Api from './base'

export interface UserInfo {
  id: string
  email: string
  nickName: string
  accountType: string
  role: string
  avatar: string
}

export interface LoginResData {
  token: string
  tokenExpire: string
  userInfo: UserInfo
}

export interface LoginParams {
  email: string
  password: string
}

// 用户登录
export function userLogin(data: LoginParams): Promise<ResultData<LoginResData>> {
  return Api.post('/login/emailLogin', data)
}

// 用户退出登录
export function userLoginOut(): Promise<ResultData<null>> {
  return Api.get('/login/signOut')
}

// 获取邮箱验证码
export function getVerificationCode(data: { email: string }): Promise<ResultData<string>> {
  return Api.post('/user/getVerificationCode', data)
}

// 用户注册
export function userRegister(data: LoginParams): Promise<ResultData<LoginResData>> {
  return Api.post('/user/registration', data)
}
