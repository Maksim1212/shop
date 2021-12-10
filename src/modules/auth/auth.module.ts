import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { RolesGuard } from './guards/jwt-auth.roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfig } from '../config/models/auth.config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
        },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    UserService,
    RolesGuard,
    AuthConfig,
  ],
  exports: [AuthService],
})
export class AuthModule {
}
