import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'music'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('music_url')
      table.text('image_url')
      table.string('title')
      table.string('paragraph')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
