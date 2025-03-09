import { hash } from 'bcryptjs';
import { CreateNewOrderDto } from './dtos/create-new-order.dto';
import { OrdersRepository } from './orders.repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  async getOrders(id: string) {
    if (!id) {
      throw new BadRequestException('order id is missing');
    }
    const resp = await fetch(
      `https://we-bank.vercel.app/api/transactions/${id}`,
    );
    const data = await resp.json();
    return data;
  }

  async createNewOrder(createNewOrderDto: CreateNewOrderDto) {
    /**
     * CREATE TRANSACTION ID
     */
    const trxId = await hash(
      createNewOrderDto.buyerId +
        createNewOrderDto.transactionAmount +
        JSON.stringify(createNewOrderDto.orderedProducts) +
        Date.now(),
      7,
    );
    return this.ordersRepository.createNewOrder({
      cartData: createNewOrderDto,
      trxId: trxId,
    });
  }
}
