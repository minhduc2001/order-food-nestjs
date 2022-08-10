import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UnprocessableEntityException,
  UseGuards,
  Request,
  Response,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto, UserDto } from '../dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';


@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe()) auth: AuthDto,
    @Res({passthrough: true}) res
  ): Promise<string> {
    return this.authService.authenticate(auth, res);
  }

  @Post('register')
  async register(@Body(new ValidationPipe()) user: UserDto): Promise<any> {
    const phoneExists = await this.userService.findUserByPhone(user.phone);

    if (phoneExists) {
      throw new UnprocessableEntityException();
    }
    return await this.userService.register(user);
    //   return this.authService.authenticate(user);
  }

  @Post('refresh')
  async refreshToken(@Req() req, ) {
    const refresh_token =   req.cookies.refresh_token;
    if (!refresh_token) throw new UnauthorizedException('refresh token is required');
    
           

  }

  @Post('forgot')
  async forgotPassword(@Res({passthrough: true}) res) {
  
    return 'haha';
  }

  @Post('logout')
  async logout(@Request() req: any, @Response() res: any) {
    res.clearCookie('refreshToken');
    return res.status(200).json('Logged out!');
  }
}
