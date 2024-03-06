import { t, Static } from 'elysia'

export const AddCashbackSchema = t.Object({
  userId: t.Integer(),
  productData: t.Optional(t.Any()),
  amount: t.Numeric(),
  denom: t.String(),
  metadata: t.Optional(t.Any()),
  status: t.Optional(t.Integer())
})

export type AddCashbackDTO = Static<typeof AddCashbackSchema>
