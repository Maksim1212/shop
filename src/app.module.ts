import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './modules/config/app.config.module';
import { UsersModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { DbConfig } from './modules/config/models/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule, ConfigModule, UsersModule],
      inject: [DbConfig],
      useFactory: async (dbConfig: DbConfig) => {
        const { database, password, username, port, host } = dbConfig;
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [User],
          synchronize: true,
        };
      },
    }),
  ],
})
export class AppModule {}
