import { Injectable } from '@nestjs/common';
import { CreateNewOrderDto } from './dtos/create-new-order.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/users.schema';
import { Product } from 'src/products/product.schema';
import { Connection, Model } from 'mongoose';
import { Order } from './orders.schema';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Order.name) private orderModule: Model<Order>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createNewOrder({
    cartData: {
      buyerId,
      expectedDate,
      orderedProducts,
      sellerIds,
      transactionAmount,
    },
    trxId,
  }: {
    cartData: CreateNewOrderDto;
    trxId: string;
  }) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.orderModule.create({
        buyerId,
        expectedDate: new Date(expectedDate),
        trxId,
        orderPlacementDate: Date.now(),
        sellerIds,
        transactionAmount,
        orderedProducts,
      });
      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      throw error;
    }
  }
}
