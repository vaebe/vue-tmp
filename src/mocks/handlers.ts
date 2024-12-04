import type { LoginParams } from '@/api/login'
import type { UserInfo } from '@/api/user'
import { Decrypt } from '@/utils/password'
import dayjs from 'dayjs'
import { http, HttpResponse } from 'msw'
import { v4 as uuidv4 } from 'uuid'

type RequireUserInfo = Required<UserInfo>

const userList: UserInfo[] = [
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

function sendJson(code: number, data: any, msg: string = '') {
  const info = { code, data, msg }
  return HttpResponse.json(info, { status: 200 })
}

function getApiUrl(path: string) {
  const basePath = import.meta.env.PROD ? '/vue-tmp/' : '/'

  return `${basePath}${path}`
}

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
        avatar: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=kkf2Pg&size=64',
      }

      userList.push(newUser)

      newUser.password = ''
      return sendJson(0, newUser)
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

  // 删除用户
  http.delete(getApiUrl('api/user/:userId'), ({ params }) => {
    const { userId } = params
    const index = userList.findIndex(user => user.id === userId)

    if (index > -1) {
      userList.splice(index, 1)
      return sendJson(0, null, 'User deleted')
    }
    else {
      return sendJson(-1, null, 'User not found')
    }
  }),

  // 更新用户
  http.put<RequireUserInfo, UserInfo>(getApiUrl('api/user/:userId'), async ({ request, params }) => {
    const { id } = params
    const newUserInfo = await request.json()

    const user = userList.find(user => user.id === id)

    if (user) {
      return sendJson(0, { ...user, ...newUserInfo })
    }
    else {
      return sendJson(-1, null, 'User not found')
    }
  }),
]
