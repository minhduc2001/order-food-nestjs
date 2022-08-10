import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './food.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
  ) {}

  async getAll(): Promise<Food[]> {
    return await this.foodRepository.find();
  }

  async get(id: string): Promise<Food> {
    return await this.foodRepository.findOne({ where: { id } });
  }

  async add(food: any): Promise<Food>{
    return await this.foodRepository.save(food);
  }

  async update(id: string, food: any): Promise<any>{
    return await this.foodRepository.update(id, food);
  }

  async delete(id: string): Promise<any>{
    return await this.foodRepository.delete(id);
  }
}
