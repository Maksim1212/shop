import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app.config.service';
import { AppConfig } from './models/app.config';
import { DbConfig } from './models/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppConfig, DbConfig, AppConfigService, ConfigService],
  exports: [AppConfig, DbConfig, AppConfigService],
})
export class AppConfigModule {}
