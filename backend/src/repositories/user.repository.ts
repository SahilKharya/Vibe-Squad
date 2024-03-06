import prisma from '../database/prisma'
import { AddUserDTO, UpdateUserDTO } from '../dtos/users'

class UserRepository {
  async findAll(query: any) {
    let whereQuery = {};
    if (query && Object.keys(query).length > 0) {
      whereQuery = {
        where: query
      }
    }
    return await prisma.user.findMany(whereQuery)
  }

  async findById(id: number) {
    return await prisma.user.findFirst({ where: { id } })
  }

  async add(data: AddUserDTO) {
    return await prisma.user.create({ data })
  }

  async removeById(id: number) {
    return (await this.findById(id))
      ? await prisma.user.delete({ where: { id } })
      : null
  }

  async updateById(id: number, data: UpdateUserDTO) {
    return (await this.findById(id))
      ? await prisma.user.update({ where: { id }, data })
      : null
  }
}

export default new UserRepository()
