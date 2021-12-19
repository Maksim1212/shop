import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { RolesGuard } from './guards/jwt-auth.roles.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfig } from '../config/models/auth.config';
import { AppConfigService } from '../config/app.config.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (authConfig: AuthConfig) => {
        const { jwtSecret, jwtExpiration } = authConfig;
        return {
          secret: jwtSecret,
          signOptions: {
            expiresIn: jwtExpiration,
          },
        };
      },
    }),
  ],
  providers: [
    AppConfigService,
    AuthConfig,
    JwtStrategy,
    AuthService,
    RolesGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {
}
