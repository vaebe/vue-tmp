import { httpPost } from './use-http';

export default {
  // 登录
  login(opts: any) {
    return httpPost({
      url: '/sys/login',
      data: opts
    });
  },

  loginOut(opts: any) {
    return httpPost({
      url: '/sys/loginOut',
      data: opts
    });
  }
};
