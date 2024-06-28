import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'music'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('music-url')
      table.text('image-url')
      table.string('title')
      table.string('paragraph')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
