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
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectConnection() private connection: Connection,
  ) {}

  async getOrdersByUserId(id: string) {
    return this.orderModel
      .find({
        buyerId: id,
      })
      .select('-__v')
      .populate({
        path: 'orderedProducts.productId',
        select: '-__v -sellerId',
      })
      .populate({
        path: 'orderedProducts.sellerId',
        select: '-__v -roles -createdAt -password -products',
      });
  }

  async getDetailsOFEachCartProduct(createNewOrderDto: CreateNewOrderDto) {
    const productsDetails = await this.productModel
      .find({
        _id: {
          $in: createNewOrderDto.orderedProducts.map((oP) => oP.productId),
        },
      })
      .select('_id price');
    return productsDetails;
  }

  async createNewOrder({
    cartData: {
      buyerId,
      expectedDate,
      orderedProducts,
      totalTransactionAmount,
    },
    trxId,
  }: {
    cartData: CreateNewOrderDto;
    trxId: string;
  }) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      await this.orderModel.create({
        buyerId,
        expectedDate: new Date(expectedDate),
        trxId,
        orderPlacementDate: Date.now(),
        totalTransactionAmount,
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
