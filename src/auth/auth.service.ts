import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { AuthDto } from '../dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayloadInterface): Promise<User | null> {
    return await this.userService.getUser(payload.id.toString());
  }

  async authenticate(auth: AuthDto, res): Promise<any> {
    const user = await this.userService.findByPhoneWithPassword(auth.phone);
    console.log(user);

    if (!user) {
      throw new BadRequestException();
    }

    const isRightPassword = await this.userService.compareHash(
      auth.password,
      user.password,
    );
    if (!isRightPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    await res.cookie(
      'refresh_token',
      this.jwtService.sign(
        { id: user.id },
        { secret: 'refresh_token', expiresIn: '1d' },
      ),
      {
        httpOnly: true,
        secure: true, //true
        path: '/',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      },
    );
    return {
      id: user.id,
      phone: user.phone,
      username: user.username,
      access_token: this.jwtService.sign({ id: user.id }),
    };
  }

  async refresh(): Promise<any> {
    return;
  }
}
