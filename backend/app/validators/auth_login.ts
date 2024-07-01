import vine from '@vinejs/vine'

const authLoginSchema = vine.compile(
  vine.object({
    email: vine.string().unique(async (db, value, field) => {
      const user = await db
        .from('users')
        .whereNot('id', field.meta.userId)
        .where('email', value)
        .first()
      return !user
    }),
    password: vine.string().trim().minLength(5).maxLength(100),
  })
)

export default authLoginSchema
