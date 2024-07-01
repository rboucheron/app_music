import User from '#models/user'
import authLoginSchema from '#validators/auth_login'
import authRegisterSchema from '#validators/auth_register'
import AuthRegisterValidator from '#validators/auth_register'
import type { HttpContext } from '@adonisjs/core/http'
import { messages } from '@vinejs/vine/defaults'
import { request } from 'http'

export default class AuthController {
  public async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(authRegisterSchema)
    await User.create(data)
    return response.status(201).json({ messages: 'User Creat' })
  }
  public async login({ request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(authLoginSchema)
    const user = await User.verifyCredentials(email, password)
    return await auth.use('api').login(user)
  }
}
