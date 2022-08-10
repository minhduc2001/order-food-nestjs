import { registerAs } from '@nestjs/config';
export default registerAs('JwtConfig', () => ({
  secretOrPrivateKey: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES,
  },
}));
