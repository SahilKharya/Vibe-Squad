import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import figlet from "figlet";
import {
  userRoutes,
  keylinkRoutes
} from './routes'

const PORT = Bun.env.PORT || 3000

const app = new Elysia()
  .use(cors())
  .use(userRoutes)
  .use(keylinkRoutes)
  .get('/', () => 'Skyrise working')
  .listen(PORT)

console.log(
  figlet.textSync("Skyrise", {
    font: "Sub-Zero"
  }),
  `\n🚀running at ${app.server?.hostname}:${app.server?.port}`,
)
