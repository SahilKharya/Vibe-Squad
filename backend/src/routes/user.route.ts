import { Elysia } from 'elysia'
import {
  findAll,
  findOne,
  add,
  remove,
  update,
  checkRanking,
  calculateDiscount,
  newCashbackUser
} from '../handlers/user.handler'
import { AddUserSchema, UpdateUserSchema, RankingUserSchema } from '../dtos/users'

export const userRoutes = (app: Elysia) => (
  app.get('/user', async ({ query, set }) => {
    return await findAll(query)
  }),
  app.post('/user/login', async ({ body, set }) => {
    // console.log('body:', body);
    const users = await findAll({
      account: body.account
    });
    if (users.length === 1) {
      const user = users[0];
      let dataToUpdate = body;
      dataToUpdate.account = user.account;
      dataToUpdate.lastLogin = new Date;
      const updatedUser = await update(user.id, dataToUpdate)
      set.status = 'OK' // Status 200
      return updatedUser
    } else if(users.length > 0) {
      // TODO: Handle Duplicate Data
      console.log('Duplicate Data smh 🤦🏻‍♂️');
      const user = users[0];
      return user
    } else {
      // User does not exist by account. Search by social
      const socialWhereQuery = {
        social: {
          path: [Object.keys(body.social)[0], 'username'],
          equals: body.social[Object.keys(body.social)[0]].username
        }
      }
      const socialUsers = await findAll(socialWhereQuery)
      if (socialUsers.length > 0) {
        const socialUser = socialUsers[0]
        let socialUserDataToUpdate = body;
        delete socialUserDataToUpdate.social;
        socialUserDataToUpdate.lastLogin = new Date;
        const updatedSocialUser = await update(socialUser.id, socialUserDataToUpdate)
        await newCashbackUser(socialUserDataToUpdate.account);
        set.status = 'OK' // Status 200
        return updatedSocialUser
      } else {
        // Create
        body.loginType = 0;
        body.role = 0;
        body.images = {
          "profile": 'https://i.imgur.com/szdNdzR.jpg',
          "cover": 'https://assets.dripverse.org/backgrounds/cat.jpeg'
        };
        body.lastLogin = new Date;
        const user = await add(body)
        if (user) {
          await newCashbackUser(body.account);
          set.status = 'Created'
          return user
        }
      }
    }
  },
  {
    body: AddUserSchema,
  }),
  app.get('/user/:id', async ({ params: { id }, set }) => {
    const user = await findOne(parseInt(id))
    if (user) {
      return user
    } else {
      set.status = 'Not Found' // Status 404
    }
  }),
  app.post(
    '/user',
    async ({ body, set }) => {
      body.loginType = 0;
      body.role = 0;
      body.images = {
        "profile": 'https://i.imgur.com/szdNdzR.jpg',
        "cover": 'https://assets.dripverse.org/backgrounds/cat.jpeg'
      };
      body.lastLogin = new Date;
      const user = await add(body)
      if (user) {
        await newCashbackUser(body.account);
        set.status = 'Created'
        return user
      }
    },
    {
      body: AddUserSchema,
    },
  ),
  // app.delete('/user/:id', async ({ params: { id }, set }) => {
  //   const deletedUser = await remove(id)
  //   if (deletedUser) {
  //     set.status = 'OK' // Status 200
  //     return { message: 'User deleted successfully' }
  //   } else {
  //     set.status = 'Not Found' // Status 404
  //   }
  // }),
  app.put(
    '/user/:id',
    async ({ params: { id }, body, set }) => {
      const updatedUser = await update(parseInt(id), body)
      if (updatedUser) {
        set.status = 'OK' // Status 200
        return updatedUser
      } else {
        set.status = 'Not Found' // Status 404
      }
    },
    {
      body: UpdateUserSchema,
    },
  ),
  app.post(
    '/user/reward/check',
    async ({ body }) => {
      console.log('body:', body);
      let rewardData = {
        ranking: 0,
        discountElligible: 20
      }
      rewardData.ranking = await checkRanking(body);
      rewardData.discountElligible = await calculateDiscount(rewardData.ranking);
      return {
        data: rewardData,
        error: null,
        message: 'Reward details for User'
      }
    },
    {
      body: RankingUserSchema
    }
  )
  // TODO: Following routes if needed by frontend.
  // app.get('/user/:id/uses', async ({ params: { id }, set }) => {
  //   const user = await findOne(parseInt(id))
  //   if (user) {
  //     return user
  //   } else {
  //     set.status = 'Not Found' // Status 404
  //   }
  // }),
  // app.get('/user/:id/rewards', async ({ params: { id }, set }) => {
  //   const user = await findOne(parseInt(id))
  //   if (user) {
  //     return user
  //   } else {
  //     set.status = 'Not Found' // Status 404
  //   }
  // }),
  // app.post('/user/:id/reward/payout', async ({ params: { id }, set }) => {
  //   const user = await findOne(parseInt(id))
  //   if (user) {
  //     return user
  //   } else {
  //     set.status = 'Not Found' // Status 404
  //   }
  // })
)
