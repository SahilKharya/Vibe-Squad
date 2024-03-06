import prisma from '../database/prisma'
import { AddCashbackDTO, UpdateCashbackDTO } from '../dtos/cashbacks'

class CashbackRepository {
  async findAll(query: any) {
    let whereQuery = {};
    if (query && Object.keys(query).length > 0) {
      whereQuery = {
        where: query
      }
    }
    return await prisma.cashback.findMany(whereQuery)
  }

  async findById(id: number) {
    return await prisma.cashback.findFirst({ where: { id } })
  }

  async add(data: AddCashbackDTO) {
    return await prisma.cashback.create({ data })
  }

  async removeById(id: number) {
    return (await this.findById(id))
      ? await prisma.cashback.delete({ where: { id } })
      : null
  }

  async updateById(id: number, data: UpdateCashbackDTO) {
    return (await this.findById(id))
      ? await prisma.cashback.update({ where: { id }, data })
      : null
  }
}

export default new CashbackRepository()
