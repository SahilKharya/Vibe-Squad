import prisma from '../database/prisma'
import { AddKeylinkDTO } from '../dtos/keylinks'

class KeylinkRepository {
  async findAll(query: any) {
    let whereQuery = {};
    if (query && Object.keys(query).length > 0) {
      whereQuery = {
        where: query
      }
    }
    return await prisma.keylink.findMany(whereQuery)
  }

  async findById(id: number) {
    return await prisma.keylink.findFirst({ where: { id } })
  }

  async add(data: AddKeylinkDTO) {
    return await prisma.keylink.create({ data })
  }

  async removeById(id: number) {
    return (await this.findById(id))
      ? await prisma.keylink.delete({ where: { id } })
      : null
  }
}

export default new KeylinkRepository()
