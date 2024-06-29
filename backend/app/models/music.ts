import { DateTime } from 'luxon'
import { BaseModel, column} from '@adonisjs/lucid/orm'

export default class Music extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public musicUrl!: string

  @column()
  public imageUrl!: string

  @column()
  public title!: string

  @column()
  public paragraph!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
