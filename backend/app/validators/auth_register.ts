import vine from '@vinejs/vine'

const authRegisterSchema = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(100),
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

export default authRegisterSchema
