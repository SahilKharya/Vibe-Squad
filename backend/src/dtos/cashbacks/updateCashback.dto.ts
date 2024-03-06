import { t, Static } from 'elysia'

export const UpdateCashbackSchema = t.Object({
  productData: t.Optional(t.Any()),
  amount: t.Numeric(),
  denom: t.String(),
  metadata: t.Optional(t.Any()),
  status: t.Optional(t.Integer())
})

export type UpdateCashbackDTO = Static<typeof UpdateCashbackSchema>
