import type { AnyObject } from '@/types'

type PrimitiveData = Record<
  string,
  string | number | any[] | Record<string, any> | null
>

export function resetObjToPrimitiveType(data: PrimitiveData | null): PrimitiveData | null {
  if (!data)
    return data

  const newData: PrimitiveData = {}

  Object.keys(data).forEach((item) => {
    if (typeof data[item] === 'number')
      newData[item] = 0
    else if (Array.isArray(data[item]))
      newData[item] = []
    else if (
      Object.prototype.toString.call(data[item]) === '[object Object]'
    )
      newData[item] = {}
    else
      newData[item] = ''
  })

  return newData
}

// 根据文件名称获取文件类型
export function getFileTypeByFileName(fileName: string): string {
  return fileName.substring(fileName.lastIndexOf('.') + 1)
}

// 是否是视频
export function isVideo(url: string): boolean {
  const fileType = getFileTypeByFileName(url)
  const videoExtensions = ['mp4', 'm4v']

  return (
    videoExtensions.includes(fileType)
    || url.includes('mp4')
    || url.includes('m4v')
  )
}

/**
 * 获取 assets\img 静态资源
 * @param url
 */
export function getAssetsImgFile(url: string): string {
  return new URL(`../assets/img/${url}`, import.meta.url).href
}

/**
 * 克隆对象使用 JSON.parse(JSON.stringify(data))
 * @param data
 */
export function dataClone(data: AnyObject) {
  return JSON.parse(JSON.stringify(data))
}
