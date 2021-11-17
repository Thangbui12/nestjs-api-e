import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../users/dtos/login-user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    await this.usersService.checkPassword(loginDto.password, user);
    const payload = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };
    return {
      id: user._id,
      email: user.email,
      username: user.username,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_FRESHTOKEN_SERCET_KEY,
        expiresIn: process.env.JWT_FRESHTOKEN_EXPIRES,
      }),
    };
  }
}
