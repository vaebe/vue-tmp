import type { LoginParams } from '@/api/login'
import type { UserInfo } from '@/api/user'
import dayjs from 'dayjs'
import { http } from 'msw'
import { Decrypt } from '@/utils/password'
import { getApiUrl, sendJson } from './utils'

let userList: UserInfo[] = [
  {
    id: '1bofj153qd3188su7qb00u5n6oh',
    email: 'admin@qq.com',
    password: '123456',
    nickName: 'kkf2Pg',
    accountType: '01',
    role: '01',
    updatedAt: '2024-07-28 22:04:04',
    createdAt: '2024-07-28 22:04:04',
    avatar: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=kkf2Pg&size=64',
  },
  {
    id: '1n3o6n1qh7d2uywa45y8100xweg0w',
    email: 'test@qq.com',
    password: '123456',
    nickName: 'kklpCj',
    accountType: '01',
    role: '01',
    updatedAt: '2024-07-21 13:28:33',
    createdAt: '2024-07-21 13:28:33',
    avatar: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=kklpCj&size=64',
  },
]

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
        id: crypto.randomUUID(),
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
        id: crypto.randomUUID(),
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

    userList = userList.filter(user => user.id !== id)

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

    let isUserExists = false

    userList = userList.map((user) => {
      if (user.id === newUserInfo.id) {
        isUserExists = true
        return { ...newUserInfo, avatar: user.avatar }
      }
      return user
    })

    if (isUserExists) {
      return sendJson(0, '', '更新成功！')
    }
    else {
      return sendJson(-1, null, '用户不存在！')
    }
  }),

  // 获取用户列表
  http.post(getApiUrl('api/user/getList'), () => {
    const list: UserInfo[] = userList.map(user => ({ ...user, password: '' }))

    const data = { list, pageNo: 1, pageSize: 10, total: list.length }

    return sendJson(0, data)
  }),
]
