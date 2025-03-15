import { UsersService } from './../users/users.service';
import { hash } from 'bcryptjs';
import { CreateNewOrderDto } from './dtos/create-new-order.dto';
import { OrdersRepository } from './orders.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly usersService: UsersService,
  ) {}

  async getOrdersByUserId(id: string) {
    await this.usersService.getUser(id);
    return this.ordersRepository.getOrdersByUserId(id);
  }

  /**
   * Adds the total cost for each product sepearetely
   */
  async getTotalCostForEachCartProduct(createNewOrderDto: CreateNewOrderDto) {
    const productDetails =
      await this.ordersRepository.getDetailsOFEachCartProduct(
        createNewOrderDto,
      );

    const transformedData = {
      ...createNewOrderDto,
      orderedProducts: createNewOrderDto.orderedProducts.map((oP) => ({
        ...oP,
        totalCostForTheProduct:
          oP.orderedProductsCount *
          productDetails.find((pD) => pD._id.toString() === oP.productId).price,
      })),
    };

    return transformedData;
  }

  async makeTransactionWithBank(createNewOrderDto: CreateNewOrderDto) {
    const transformedData =
      await this.getTotalCostForEachCartProduct(createNewOrderDto);

    const response = await fetch(
      `${process.env.BANK_SERVER_URL}/transactions/transact-money`,
      {
        method: 'POST',
        body: JSON.stringify(transformedData),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message);
      err.name = 'bankerror';
      throw err;
    }
  }

  async generateTransactionId(createNewOrderDto: CreateNewOrderDto) {
    const trxId = await hash(
      createNewOrderDto.buyerId +
        createNewOrderDto.totalTransactionAmount +
        JSON.stringify(createNewOrderDto.orderedProducts) +
        Date.now(),
      7,
    );
    return trxId;
  }

  async createNewOrder(createNewOrderDto: CreateNewOrderDto) {
    await this.makeTransactionWithBank(createNewOrderDto);
    const trxId = await this.generateTransactionId(createNewOrderDto);

    return this.ordersRepository.createNewOrder({
      cartData: createNewOrderDto,
      trxId: trxId,
    });
  }
}
