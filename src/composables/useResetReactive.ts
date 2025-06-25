import { dataClone } from '@/utils/tool'

// 重置 reactive 为默认值
export function useResetReactive<T extends object>(
  value: T,
  clone: (value: T) => T = dataClone,
) {
  const state = reactive(clone(value)) as T

  const reset = () => {
    const newState = clone(value)
    Object.keys(state).forEach(key => delete state[key as keyof T])
    Object.assign(state, newState)
  }

  return [state, reset] as [typeof state, typeof reset]
}
