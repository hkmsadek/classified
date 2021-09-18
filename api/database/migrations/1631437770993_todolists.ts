import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Todolists extends BaseSchema {
  protected tableName = 'todolists'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('task_name').notNullable()
      table.boolean('is_done').defaultTo(0).comment('0 mean not done, 1 mean done, 2 mean abondoned...')


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

