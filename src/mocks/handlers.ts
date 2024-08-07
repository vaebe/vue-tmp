import { HttpResponse, http } from 'msw'

interface User {
  id: number
  username: string
  password: string
}

interface UserResponse {
  id: number
  username: string
}

interface LoginRequestBody {
  username: string
  password: string
}

const users: User[] = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
]

export const handlers = [
  // 登录接口
  http.post<LoginRequestBody, LoginRequestBody>('/api/user/login', async ({ request }) => {
    const { username, password } = await request.json()
    const user = users.find(user => user.username === username && user.password === password)

    if (user)
      return HttpResponse.json<UserResponse>({ id: user.id, username: user.username }, { status: 200 })
    else
      return HttpResponse.json({ message: 'Invalid username or password' }, { status: 401 })
  }),

  // 注册接口
  http.post('/register', async ({ request }) => {
    const { username, password } = await request.json()
    const userExists = users.some(user => user.username === username)

    if (userExists) {
      return HttpResponse.json({ message: 'User already exists' }, { status: 409 })
    }
    else {
      const newUser: User = { id: users.length + 1, username, password }
      users.push(newUser)
      return HttpResponse.json<UserResponse>({ id: newUser.id, username: newUser.username }, { status: 201 })
    }
  }),

  // 获取用户列表
  http.get('/users', () => {
    const userResponses: UserResponse[] = users.map(user => ({ id: user.id, username: user.username }))
    return HttpResponse.json(userResponses, { status: 200 })
  }),

  // 删除用户
  http.delete('/users/:userId', ({ params }) => {
    const { userId } = params
    const index = users.findIndex(user => user.id === Number.parseInt(userId as string))

    if (index > -1) {
      users.splice(index, 1)
      return HttpResponse.json({ message: 'User deleted' }, { status: 200 })
    }
    else {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }
  }),

  // 更新用户
  http.put('/users/:userId', async ({ request, params }) => {
    const { userId } = params
    const { username, password } = await request.json()
    const user = users.find(user => user.id === Number.parseInt(userId))

    if (user) {
      user.username = username || user.username
      user.password = password || user.password
      return HttpResponse.json<UserResponse>({ id: user.id, username: user.username }, { status: 200 })
    }
    else {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }
  }),
]
