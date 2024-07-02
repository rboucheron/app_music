import vine from '@vinejs/vine'

const authRegisterSchema = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(100),
    email: vine.string().unique(async (db, value, field) => {
      let query = db.from('users').where('email', value)
      if (field.meta.userId !== undefined) {
        query = query.whereNot('id', field.meta.userId)
      }
      const user = await query.first()
      return !user
    }),
    password: vine.string().trim().minLength(5).maxLength(100),
  })
)

export default authRegisterSchema
