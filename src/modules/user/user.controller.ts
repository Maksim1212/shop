import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserRegisterDto } from './dto/user.register.dto';
import { AuthService } from '../auth/auth.service';
import { UserLoginDto } from './dto/user.login.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/constants/role';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() userData: UserLoginDto,
  ): Promise<{ access_token: string }> {
    const reqUser = await this.userService.finUserByEmail(userData.email);
    return this.authService.login(reqUser, userData.password);
  }

  @Post('register')
  async create(@Body() newUser: UserRegisterDto): Promise<string> {
    return this.userService.createUser(newUser);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('test')
  test(@Request() req): { test: string } {
    console.log(req.body);
    return { test: 'test' };
  }
}
