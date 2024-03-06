import { t, Static } from 'elysia'

export const RankingUserSchema = t.Object({
  address: t.String(),
  social: t.Object({
    platform: t.String(),
    username: t.String()
  })
})

export type RankingUserDTO = Static<typeof RankingUserSchema>
