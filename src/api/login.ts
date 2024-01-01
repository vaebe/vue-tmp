import Api from './base';
import type { ResultData } from './base';

export interface UserInfo {
  avatar: string;
  createdAt: string;
  gender: string;
  id: number;
  nickName: string;
  password: string;
  phoneNumber: string;
  role: string;
  updatedAt: string;
  userAccount: string;
}

export interface LoginResData {
  token: string;
  expired_at: number;
  userInfo: UserInfo;
}

export interface LoginParams {
  password: string;
  userAccount: string;
  code: string;
}

export interface EmailVerificationCodeParams {
  email: string;
}

// 用户登录
export const userLogin = (
  data: LoginParams
): Promise<ResultData<LoginResData>> => Api.post('/user/login', data);

// 获取邮箱验证码
export const getVerificationCode = (
  data: EmailVerificationCodeParams
): Promise<ResultData<string>> => Api.post('/user/getVerificationCode', data);

// 用户注册
export const userRegister = (
  data: LoginParams
): Promise<ResultData<LoginResData>> => Api.post('/user/register', data);

// 获取用户详情
export const getUserDetails = (params: {
  id: number;
}): Promise<ResultData<UserInfo>> => Api.get('/user/details', { params });
