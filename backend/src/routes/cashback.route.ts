import { Elysia } from 'elysia'
import {
  findAll,
  findOne,
  add,
  remove,
  update,
  recordCashback,
  payout
} from '../handlers/cashback.handler'
import { AddCashbackSchema, UpdateCashbackSchema } from '../dtos/cashbacks'

export const cashbackRoutes = (app: Elysia) => (
  app.get('/cashback', async ({ query, set }) => {
    console.log('query:', query);
    return await findAll(query)
  }),
  app.get('/cashback/summary', async ({ query, set }) => {
    const cashbacks = await findAll(query)
    if (cashbacks.length > 0) {
      const cashbackResponse = {
        totalCashback: 0,
        totalPending: 0,
        totalProcessed: 0
      };
      for (let c = 0; c < cashbacks.length; c++) {
        if (cashbacks[c].status === 1) {
          cashbackResponse.totalPending += cashbacks[c].amount;
        } else if (cashbacks[c].status === 2) {
          cashbackResponse.totalProcessed += cashbacks[c].amount;
        }
        cashbackResponse.totalCashback += cashbacks[c].amount;
      }
      return cashbackResponse
    } else {
      set.status = 'Not Found' // Status 404
    }
  }),
  app.get('/cashback/:id', async ({ params: { id }, set }) => {
    const cashback = await findOne(parseInt(id))
    if (cashback) {
      return cashback
    } else {
      set.status = 'Not Found' // Status 404
    }
  }),
  app.post(
    '/cashback',
    async ({ body, set }) => {
      const cashback = await add(body)
      if (cashback) {
        await recordCashback(body.userId, body.amount);
        set.status = 'Created'
        return cashback
      }
    },
    {
      body: AddCashbackSchema,
    },
  ),
  app.post(
    '/cashback/:id/process',
    async ({ params: { id }, body, set }) => {
      const cashback = await findOne(parseInt(id))
      if (cashback) {
        body.status = 2
        await update(parseInt(id), body)
        await payout(cashback.userId, body.amount)
      } else {
        set.status = 'Not Found' // Status 404
      }
    },
    {
      body: AddCashbackSchema,
    },
  ),
  // app.delete('/cashback/:id', async ({ params: { id }, set }) => {
  //   const deletedCashback = await remove(id)
  //   if (deletedCashback) {
  //     set.status = 'OK' // Status 200
  //     return { message: 'Cashback deleted successfully' }
  //   } else {
  //     set.status = 'Not Found' // Status 404
  //   }
  // }),
  app.put(
    '/cashback/:id',
    async ({ params: { id }, body, set }) => {
      const updatedCashback = await update(parseInt(id), body)
      if (updatedCashback) {
        set.status = 'OK' // Status 200
        return updatedCashback
      } else {
        set.status = 'Not Found' // Status 404
      }
    },
    {
      body: UpdateCashbackSchema,
    },
  )
)
