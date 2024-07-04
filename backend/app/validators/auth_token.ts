import vine from '@vinejs/vine'

const authTokenSchema = vine.compile(
    vine.object({
        token: vine.string()
    })
)

export default authTokenSchema