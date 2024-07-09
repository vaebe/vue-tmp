import Api from './base'
import type { ResultData } from './base'

export type UploadRes = ResultData<string>

// 文件上传
export function upload(data: FormData): Promise<UploadRes> {
  return Api.post('/file/upload', data)
}
