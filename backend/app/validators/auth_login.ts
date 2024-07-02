import vine from '@vinejs/vine'

const authLoginSchema = vine.compile(
  vine.object({
    email: vine.string(),
    password: vine.string().trim().minLength(5).maxLength(100),
  })
)

export default authLoginSchema
