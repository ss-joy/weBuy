import { CreateNewOrderDto } from './dtos/create-new-order.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { type Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  getOrders(@Param('id') id: string) {
    return this.ordersService.getOrdersByUserId(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createNewOrder(
    @Body(new ValidationPipe()) createNewOrderDto: CreateNewOrderDto,
    @Res() res: Response,
  ) {
    try {
      await this.ordersService.createNewOrder(createNewOrderDto);

      return res.status(201).json({
        message: 'Order placed successfully',
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message:
            error.name === 'bankerror'
              ? error.message
              : "'Order placement failed'",
        });
      }
    }
  }
}
