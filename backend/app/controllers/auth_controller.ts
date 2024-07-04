'use strict'

import User from '#models/user'
import AuthAccessToken from '#models/auth_access_token'
import authLoginSchema from '#validators/auth_login'
import authRegisterSchema from '#validators/auth_register'
import type { HttpContext } from '@adonisjs/core/http'
import generateToken from '../utilities/generate_token.js'

export default class AuthController {

  public async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(authRegisterSchema)
    await User.create(data)
    return response.status(201).json({ messages: 'User Creat' })
  }

  public async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(authLoginSchema)
    const user = await User.verifyCredentials(email, password)
    if (user !== null) {
      const token = generateToken()
      this.registerToken(user, token)
      return response.status(201).json({ token })
    } else {
      return response.status(401).json({ messages: 'invalid password or email' })
    }
  }

  private async registerToken(user: User, token: string) {
    const accessToken = { userId: user.id, token: token }
    await AuthAccessToken.create(accessToken)
  }

  public async tokenLogin({ request }: HttpContext) {
    const token = request.header('token')
    if (token !== undefined) {
      const userToken = await AuthAccessToken.verifyToken(token)
      return userToken?.userId
    } else {
      return null
    }
  }

}
