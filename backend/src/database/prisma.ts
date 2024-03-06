import { PrismaClient } from '@prisma/client'

// If you want to see the SQL you can uncomment below
const prisma = new PrismaClient({
  datasourceUrl: Bun.env.DATABASE_URL,
  log: [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
  ],
  errorFormat: 'pretty',
})

prisma.$on('warn', (e) => {
  console.log(e)
})

prisma.$on('info', (e) => {
  console.log(e)
})

prisma.$on('error', (e) => {
  console.log(e)
})

export default prisma
