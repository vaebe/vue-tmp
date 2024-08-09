import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon: string
  }
}

// 值为任意类型的Object
export type AnyObject = Record<string, any>

// 分页参数
export interface PaginationParameter {
  pageSize: number
  pageNo: number
  total?: number
}
