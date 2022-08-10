import { ApiProperty } from "@nestjs/swagger";

export class UpdateFoodDto{
    @ApiProperty()
    name?: string;

    @ApiProperty()
    quantity?: number;

    @ApiProperty()
    price?: number;

    @ApiProperty()
    description?: string;
}