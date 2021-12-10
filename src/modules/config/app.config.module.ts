import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app.config.service';
import { AppConfig } from './models/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppConfig, AppConfigService, ConfigService],
  exports: [AppConfig, AppConfigService],
})
export class AppConfigModule {}
