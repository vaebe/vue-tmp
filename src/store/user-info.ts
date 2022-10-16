import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { resetObjToPrimitiveType } from '@/utils/tool';

export interface UserInfoType {
  token: '';

  [propName: string]: string | number | object;
}

export const useUserInfo = defineStore(
  'user-info',
  () => {
    const userInfo = reactive<UserInfoType>({
      token: ''
    });

    const setUserInfo = (data: UserInfoType) => {
      Object.assign(userInfo, data);
    };

    const clearUserInfo = () => {
      Object.assign(userInfo, resetObjToPrimitiveType(userInfo));
    };

    return {
      userInfo,
      setUserInfo,
      clearUserInfo
    };
  },
  {
    persist: {
      enabled: true
    }
  }
);
