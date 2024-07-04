import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@adonisjs/lucid/orm'

export default class AuthAccessToken extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare token: string

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare lastUsedAt: DateTime

  @column.dateTime()
  declare expiresAt: DateTime

  @beforeSave()
  public static async defineExpireDate(AuthAccessToken: AuthAccessToken) {
    const expiresAt = DateTime.now().plus({ months: 1 })
    AuthAccessToken.expiresAt = expiresAt
  }

  public static async verifyToken(token: string) {
    const accessToken = await this.findBy('token', token)
    if (accessToken !== null && accessToken.expiresAt >= DateTime.now()) {
      return accessToken
    } else {
      return null
    }
  }
}
