import { ApiProperty } from '@nestjs/swagger';


export class AuthDto {
  @ApiProperty({example: '0768368218'})
  phone: string;

  @ApiProperty({example: 123})
  password: string;
}
