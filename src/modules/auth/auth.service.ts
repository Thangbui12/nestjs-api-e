import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../users/dtos/login-user.dto';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(loginDto.email);
    await this.usersService.checkPassword(loginDto.password, user.password);
    const payload: IJwtPayload = {
      username: user.username,
      email: user.email,
      role: user.role,
      salt: user.salt,
    };
    return {
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_FRESHTOKEN_SERCET_KEY,
        expiresIn: process.env.JWT_FRESHTOKEN_EXPIRES,
      }),
    };
  }
}
