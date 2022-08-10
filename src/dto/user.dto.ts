import { ApiProperty } from "@nestjs/swagger";


export enum Role {
  ADMIN = 0,
  USER = 1
}

export class UserDto {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: Role;
}
