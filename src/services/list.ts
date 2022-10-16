import { httpPost } from './use-http';

export default {
  queryList(opts: any) {
    return httpPost({
      url: '/demo/queryList',
      data: opts
    });
  }
};
