import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodService } from './food.service';

@ApiTags('Food')
@Controller('food')
export class FoodController {
    constructor(private foodService: FoodService){}

    @Get()
    getAll(){
        return this.foodService.getAll();
    }

    @Post()
    create(@Body() body: CreateFoodDto){
        return this.foodService.add(body);
    }

    @Get(':id')
    getFood(@Param('id') id: string){
        return this.foodService.get(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: UpdateFoodDto){
        return this.foodService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.foodService.delete(id);
    }
}

