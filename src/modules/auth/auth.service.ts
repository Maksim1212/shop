import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { AuthConfig } from '../config/models/auth.config';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authConfig: AuthConfig,
  ) {}

  async login(
    user: User,
    userReqPassword: string,
  ): Promise<{ access_token: string }> {
    const { id, role, password } = user;
    const isPasswordCorrect = await compare(userReqPassword, password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return {
      access_token: this.jwtService.sign(
        { sub: id, role },
        {
          secret: this.authConfig.jwtSecret,
        },
      ),
    };
  }
}
