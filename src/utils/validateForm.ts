export function validatePhoneNumber(_rule: any, value: any, callback: any): void {
  const regExp = /^1(?:[38]\d|14[579]|5[^4]|166|7[1-35-8]|9[189])\d{8}$/

  if (value === '')
    callback(new Error('手机号不能为空'))
  else if (!regExp.test(value))
    callback(new Error('手机号格式不正确'))
  else
    callback()
}
