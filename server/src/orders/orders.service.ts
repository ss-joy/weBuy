import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
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
}
