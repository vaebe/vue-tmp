// src/server.ts
import { Model, Response, createServer } from 'miragejs'

interface User {
  id: string
  username: string
  password: string
  email: string
}

export function makeServer() {
  return createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },

    seeds(server) {
      server.create('user', { id: '1', username: 'admin@example.com', password: 'admin', email: 'admin@example.com' })
      server.create('user', { id: '2', username: 'user1', password: 'user1', email: 'user1@example.com' })
    },

    routes() {
      this.namespace = 'api'

      // 登录
      this.post('/user/login', (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody) as { username: string, password: string }

        const user = schema.users.findBy({ username, password })
        if (user) {
          return { user }
        }
        else {
          return new Response(401, {}, { error: 'Invalid credentials' })
        }
      })

      // 获取用户列表
      this.get('/users', (schema) => {
        return schema.users.all()
      })

      // 创建用户
      this.post('/users', (schema, request) => {
        const attrs = JSON.parse(request.requestBody) as User
        return schema.users.create(attrs)
      })

      // 更新用户
      this.put('/users/:id', (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody) as Partial<User>
        const id = request.params.id
        const user = schema.users.find(id)
        if (user) {
          return user.update(newAttrs)
        }
        else {
          return new Response(404, {}, { error: 'User not found' })
        }
      })

      // 删除用户
      this.delete('/users/:id', (schema, request) => {
        const id = request.params.id
        const user = schema.users.find(id)
        if (user) {
          user.destroy()
          return new Response(204)
        }
        else {
          return new Response(404, {}, { error: 'User not found' })
        }
      })
    },
  })
}
