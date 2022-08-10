import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}


  @Get()
  @UseGuards(JwtAuthGuard)
  get() {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }

  @Get(':id')
  getUser(@Param('id') id: string){
    return this.userService.getUser(id);
  }

}
