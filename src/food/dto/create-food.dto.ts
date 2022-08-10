import { ApiProperty } from "@nestjs/swagger";

export class CreateFoodDto{
    @ApiProperty()
    name: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    description: string;
}