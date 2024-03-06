import { t, Static } from 'elysia'

export const AddKeylinkSchema = t.Object({
  key: t.Optional(t.String()),
  network: t.String(),
  contract: t.String(),
  user: t.String(),
  redirect: t.Optional(t.String())
})

export type AddKeylinkDTO = Static<typeof AddKeylinkSchema>
