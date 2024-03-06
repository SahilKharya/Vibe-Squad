import { Elysia } from 'elysia'
import {
  findAll,
  findOne,
  add,
  remove,
  markUse,
  participate
} from '../handlers/keylink.handler'
import { generateKey } from '../handlers/utils.handler'
import { AddKeylinkSchema } from '../dtos/keylinks'

export const keylinkRoutes = (app: Elysia) => (
  app.get('/keylink', async ({query}) => {
    return await findAll(query)
  }),
  app.get(
    '/keylink/use',
    async ({ query, set }) => {
      console.log('query:', query);
      const linkResponse: any = {
        redirect: ''
      };
      const keylinks = await findAll(query)
      if (keylinks.length > 0) {
        const keylink = keylinks[0]
        console.log('keylink:', keylink);
        // Use SC
        await markUse(keylink.user)
        linkResponse.redirect = keylink.redirect;
        set.status = 'OK'
      } else {
        set.status = 'Not Found'
      }
      return linkResponse
    }
  ),
  app.get('/keylink/:id', async ({ params: { id }, set }) => {
    const keylink = await findOne(parseInt(id))
    if (keylink) {
      return keylink
    } else {
      set.status = 'Not Found' // Status 404
    }
  }),
  app.post(
    '/keylink',
    async ({ body, set }) => {
      body.key = await generateKey(7);
      // Participate
      await participate(body.user, body.key)
      const keylink = await add(body)
      if (keylink) {
        set.status = 'Created'
        return keylink
      }
    },
    {
      body: AddKeylinkSchema,
    },
  ),
  app.delete('/keylink/:id', async ({ params: { id }, set }) => {
    const deletedKeylink = await remove(parseInt(id))
    if (deletedKeylink) {
      set.status = 'OK' // Status 200
      return { message: 'Keylink deleted successfully' }
    } else {
      set.status = 'Not Found' // Status 404
    }
  })
)
