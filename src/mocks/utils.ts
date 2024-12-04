import { HttpResponse } from 'msw'

export function getBasePath() {
  return import.meta.env.PROD ? '/vue-tmp' : ''
}

export function getApiUrl(path: string) {
  return `${getBasePath()}/${path}`
}

export function sendJson(code: number, data: any, msg: string = '') {
  const info = { code, data, msg }
  return HttpResponse.json(info, { status: 200 })
}
