import { t, Static } from 'elysia'

export const UpdateUserSchema = t.Object({
  firstName: t.Optional(t.String()),
  lastName: t.Optional(t.String()),
  account: t.String(),
  username: t.String(),
  loginType: t.Optional(t.Integer()),
  email: t.Optional(t.String()),
  intro: t.Optional(t.String()),
  bio: t.Optional(t.String()),
  location: t.Optional(t.Any()),
  social: t.Optional(t.Any()),
  status: t.Optional(t.String()),
  role: t.Optional(t.Integer()),
  images: t.Optional(t.Any()),
  lastLogin: t.Optional(t.Date())
})

export type UpdateUserDTO = Static<typeof UpdateUserSchema>
