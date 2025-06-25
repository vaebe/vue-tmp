import type { LoginParams } from '@/api/login'
import type { UserInfo } from '@/api/user'
import dayjs from 'dayjs'
import { http } from 'msw'
import { v4 as uuidv4 } from 'uuid'
import { Decrypt } from '@/utils/password'
import { userList } from './data'
import { getApiUrl, sendJson } from './utils'

const userAvatar = 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=kkf2Pg&size=64'

type RequireUserInfo = Required<UserInfo>

export const handlers = [
  // 登录接口
  http.post<LoginParams, LoginParams>(getApiUrl('api/login/emailLogin'), async ({ request }) => {
    const { email, password } = await request.json()
    const user = userList.find(user => user.email === email && user.password === Decrypt(password))

    if (user) {
      user.password = ''
      return sendJson(0, user)
    }
    else {
      return sendJson(401, null, '用户名或密码不正确!')
    }
  }),

  // 注册接口
  http.post<LoginParams, LoginParams>(getApiUrl('api/user/registration'), async ({ request }) => {
    const { email, password } = await request.json()

    const userExists = userList.some(user => user.email === email)

    if (userExists) {
      return sendJson(409, null, '用户已经存在请直接登录!')
    }
    else {
      const newUser: UserInfo = {
        id: uuidv4(),
        email,
        password,
        nickName: 'kkf2Pg',
        accountType: '01',
        role: '01',
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        avatar: userAvatar,
      }

      userList.push(newUser)

      newUser.password = ''
      return sendJson(0, newUser)
    }
  }),

  // 创建用户
  http.post<RequireUserInfo, UserInfo>(getApiUrl('api/user/create'), async ({ request }) => {
    const newUserInfo = await request.json() as UserInfo

    if (newUserInfo.email) {
      const info = {
        ...newUserInfo,
        id: uuidv4(),
        accountType: '01',
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        avatar: userAvatar,
      }

      userList.push(info)
      return sendJson(0, '', '创建成功成功！')
    }
    else {
      return sendJson(-1, null, 'User not found')
    }
  }),

  // 删除用户
  http.delete(getApiUrl('api/user/:id'), ({ params }) => {
    const { id } = params

    const user = userList.find(user => user.id === id)

    if (user) {
      return sendJson(0, null, `用户 ${user.nickName} 删除成功！`)
    }
    else {
      return sendJson(-1, null, '用户不存在！')
    }
  }),

  // 更新用户
  http.post<RequireUserInfo, UserInfo>(getApiUrl('api/user/update'), async ({ request }) => {
    const newUserInfo = await request.json() as UserInfo

    const user = userList.find(user => user.id === newUserInfo.id)

    if (user) {
      return sendJson(0, '', '更新成功！')
    }
    else {
      return sendJson(-1, null, 'User not found')
    }
  }),

  // 获取用户列表
  http.post(getApiUrl('api/user/getList'), () => {
    const list: UserInfo[] = userList.map((user) => {
      return {
        ...user,
        password: '',
      }
    })

    const data = {
      list,
      pageNo: 1,
      pageSize: 10,
      total: list.length,
    }

    return sendJson(0, data)
  }),
]
