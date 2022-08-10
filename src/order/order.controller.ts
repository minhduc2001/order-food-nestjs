import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService){}

  @Get()
  getall() {
    return this.orderService.getAll();
  }

  @Get(':id')
  get(@Param('id') id: string){
    return this.orderService.get(id);
  }

  @Post()
  create(@Body() body){
    return this.orderService.add(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any){
    return this.orderService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.orderService.delete(id);
  }
}
