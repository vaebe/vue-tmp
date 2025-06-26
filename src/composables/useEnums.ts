import type { AnyObject } from '@/types'

export interface EnumsItem {
  code: string
  name: string
}

const roleEnums = [
  {
    code: '00',
    name: '管理员',
  },
  {
    code: '01',
    name: '普通用户',
  },
  {
    code: '02',
    name: 'VIP',
  },
] as const

const accountTypeEnums = [
  {
    code: '01',
    name: '邮箱注册',
  },
  {
    code: '02',
    name: '微信注册',
  },
  {
    code: '03',
    name: 'github',
  },
] as const

// 枚举数据转换成以指定 key 为键的对象
function arrEnumsToObjEnums(list: AnyObject[] | readonly AnyObject[], key = 'code') {
  const obj = {} as typeof list[0]
  list.forEach((item) => {
    obj[item[key]] = item
  })
  return obj
}

interface GetEnumNameParams {
  key: string | number
  list: Record<string, any>[] | Readonly<Record<string, any>[]>
  code?: string
  name?: string
}

// 转换枚举-获取枚举名称
function getEnumName(config: GetEnumNameParams) {
  const { key, list, code = 'code', name = 'name' } = config

  if (!list) {
    return ''
  }

  const res = list.find(item => item[code] === key)?.[name]
  return res || ''
}

export function useEnums() {
  return {
    roleEnums,
    accountTypeEnums,
    arrEnumsToObjEnums,
    getEnumName,
  }
}
