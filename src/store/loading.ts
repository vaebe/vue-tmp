import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoading = defineStore('loading', () => {
  const globalLoading = ref(false);

  const setChangeLoading = (data: boolean) => {
    globalLoading.value = data;
  };
  return {
    globalLoading,
    setChangeLoading
  };
});
