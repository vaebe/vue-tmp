import axios from 'axios';
import type { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import loading from '@/utils/loading';
import { ElMessage } from 'element-plus';
import { useUserInfo } from '@/store/user-info';

export interface ERROR_TYPE_OBJ_TYPE {
  [propName: string]: string;
}

const ERROR_TYPE_OBJ: ERROR_TYPE_OBJ_TYPE = {
  '400': '400请求错误',
  '401': '用户登录失效，请重新登录...',
  '403': '403拒绝访问',
  '404': '404请求路径错误',
  '405': '405请求类型错误',
  '408': '请求超时',
  '500': '服务器错误',
  '501': '服务未实现',
  '502': '网络错误',
  '503': '服务不可用',
  '504': '网络超时',
  '505': 'HTTP版本不受支持'
};

// 尝试将响应数据格式化成jason 失败返回原数据
const formatTheResponseDataToJson = (response: AxiosResponse) => {
  const data = response.data;
  const enc = new TextDecoder('utf-8');
  const uint8Msg = new Uint8Array(data);
  try {
    return JSON.parse(enc.decode(uint8Msg));
  } catch (e) {
    return data;
  }
};

// 在此数组中不加载全局loading 根据 url匹配
const loadingWhitelist = ['/sys/fileUpload/upload/v2'];

// 判断是否包含指定url
function isLoadingWhite(url: string) {
  return loadingWhitelist.some((item) => {
    return url.indexOf(item) !== -1;
  });
}

const { VITE_APP_TIMEOUT, VITE_APP_BASE_URL } = import.meta.env;

// 创建axios实例
// @ts-ignore
const service = axios.create({
  baseURL: VITE_APP_BASE_URL,
  paramsSerializer: {
    encode: (params) => {
      // get 请求添加时间戳  防止缓存
      params.client = 'web';
      params.timestamp = new Date().getTime();
      return qs.stringify(params, { arrayFormat: 'brackets' });
    }
  },
  timeout: VITE_APP_TIMEOUT
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { userInfo } = useUserInfo();
    const token = userInfo.token || '';

    // 验证认证信息是否存在
    const notLoginPage = !['#/login', '#/externalLogin'].some((item) =>
      window.location.hash.includes(item)
    );

    console.log(token, '[[[[[');

    if (!token && notLoginPage) {
      ElMessage.error('用户信息不存在，请重新登录！');
      window.location.replace('#/login');
    }

    // 判断加载 全局loading
    if (!isLoadingWhite(config.url!)) {
      loading.startLoading();
    }

    // headers 添加 token
    config.headers!.token = token;

    return config;
  },
  (err) => {
    loading.endLoading();
    return Promise.reject(err);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    loading.endLoading();

    const formatTheResponseData = formatTheResponseDataToJson(response);
    if (formatTheResponseData.code && formatTheResponseData.code !== 0) {
      return Promise.reject(handleError(formatTheResponseData));
    }

    return response.data;
  },
  (error) => {
    loading.endLoading();
    return Promise.reject(handleError(error));
  }
);

// 错误处理
function handleError(error: AxiosError) {
  if (error.message === 'Network Error') {
    error.message = '请检查网络是否畅通...';
  }

  const { response } = error;
  if (response) {
    error.message = ERROR_TYPE_OBJ[response.status];
  }

  const status401 =
    error.code + '' === '401' || (response && response.status === 401);
  if (status401 && window.location.hash !== '#/login') {
    error.message = '用户登录失效，请重新登录...';
    window.location.replace('#/login');
  }

  console.warn('请求错误:', error.message, '\r\n', response, '\r\n', error);
  ElMessage.closeAll();
  ElMessage.error(`错误：${error.message || '请求错误！'}`);
  return error;
}

export default service;
