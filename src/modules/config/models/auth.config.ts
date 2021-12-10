import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';

@Injectable()
export class AuthConfig {
  readonly jwtSecret: string;

  constructor(private readonly configService: AppConfigService) {
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }
}
