import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app.config.service';
import { AppConfig } from './models/app.config';
import { DbConfig } from './models/db.config';
import { AuthConfig } from './models/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppConfig, AuthConfig, DbConfig, AppConfigService, ConfigService],
  exports: [AppConfig, AuthConfig, DbConfig, AppConfigService],
})
export class AppConfigModule {}
