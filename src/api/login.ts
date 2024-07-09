import Api from './base'
import type { ResultData } from './base'

export interface UserInfo {
  avatar: string
  createdAt: string
  gender: string
  id: number
  nickName: string
  password: string
  phoneNumber: string
  role: string
  updatedAt: string
  userAccount: string
}

export interface LoginResData {
  token: string
  expired_at: number
  userInfo: UserInfo
}

export interface LoginParams {
  password: string
  userAccount: string
  code: string
}

export interface EmailVerificationCodeParams {
  email: string
}

// 用户登录
export function userLogin(data: LoginParams): Promise<ResultData<LoginResData>> {
  return Api.post('/user/login', data)
}

// 获取邮箱验证码
export function getVerificationCode(data: EmailVerificationCodeParams): Promise<ResultData<string>> {
  return Api.post('/user/getVerificationCode', data)
}

// 用户注册
export function userRegister(data: LoginParams): Promise<ResultData<LoginResData>> {
  return Api.post('/user/register', data)
}

// 获取用户详情
export function getUserDetails(params: {
  id: number
}): Promise<ResultData<UserInfo>> {
  return Api.get('/user/details', { params })
}
