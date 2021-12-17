import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';

@Injectable()
export class AppConfig {
  readonly port: number;
  readonly environmentName: string;

  constructor(private readonly configService: AppConfigService) {
    this.port = +this.configService.get('APP_PORT');
    this.environmentName = this.configService.get('APP_ENVIRONMENT_NAME');
  }
}
