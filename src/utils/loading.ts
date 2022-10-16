import { ElLoading } from 'element-plus';
import { useLoading } from '@/store/loading';

const excludeUrlList = ['#/home'];

// 判断是否加载 loading
const hasLoading = () => {
  return !excludeUrlList.includes(window.location.hash);
};

let loading = {
  close: () => {}
};

let loadingNum = 0;

const startLoading = () => {
  const { setChangeLoading } = useLoading();

  // 在首页、登录页发起的请求不进行累加
  if (hasLoading()) {
    loadingNum++;
    setChangeLoading(true);

    loading = ElLoading.service({
      lock: true,
      text: '正在加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)'
    });
  }
};

const endLoading = () => {
  const { setChangeLoading } = useLoading();

  if (hasLoading()) {
    loadingNum--;
    loadingNum = loadingNum < 0 ? 0 : loadingNum;
    if (!loadingNum) {
      setChangeLoading(false);

      if (loading) {
        loading.close();
      }
    }
  }
};

const resetLoading = () => {
  const { setChangeLoading } = useLoading();

  console.log(setChangeLoading, 'pppp');

  // 每次路由变化 重置loading
  loadingNum = 0;
  setChangeLoading(false);

  if (loading) {
    loading.close();
  }
};

export default {
  startLoading,
  endLoading,
  resetLoading
};
