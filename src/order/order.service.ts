import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
  ) {}

  async getAll(): Promise<Order[]> {
    return this.OrderRepository.find();
  }

  async get(id: string): Promise<Order> {
    return this.OrderRepository.findOne({ where: { id } });
  }

  async add(order: any): Promise<Order> {
    return this.OrderRepository.save(order);
  }

  async update(id: string, order: any): Promise<any> {
    return this.OrderRepository.update(id, order);
  }

  async delete(id: string): Promise<any> {
    return this.OrderRepository.delete(id);
  }
}
