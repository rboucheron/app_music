import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import UserToken from '#models/user_token'
import hash from '@adonisjs/core/services/hash'
import { randomUUID } from 'crypto'

export default class UsersController {
  public async creat({ request, response }: HttpContext) {
    try {
      const data = request.only(['fullName', 'email', 'password'])
      data.password = await hash.make(data.password)
      const user = await User.create(data)
      response.status(201).json(user)
    } catch (error) {
      response.status(500).json({ message: 'Error creating user record', error })
    }
  }

  public async connect({ request, response}: HttpContext) {
    try {
      const data = request.only(['email', 'password'])
      const user = await User.query().where('email', data.email).first()
      if (!user) {
        return response.status(404).json({ message: 'User not found' })
      }

      const passwordVerified = await hash.verify(user.password, data.password)
      if (!passwordVerified) {
        return response.status(401).json({ message: 'Invalid credentials' })
      }
      const token = randomUUID() 
      await UserToken.create({ userId: user.id, token })
      response.status(200).json({ user, token })
    } catch (error) {
      response.status(500).json({ message: 'Error during authentication', error })
    }
  }
}
