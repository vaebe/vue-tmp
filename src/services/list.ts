import { httpPost } from './use-http';
import type { AxiosRequestConfig } from 'axios';

export default {
  queryList(opts: AxiosRequestConfig) {
    return httpPost({
      url: '/demo/queryList',
      data: opts
    });
  }
};
