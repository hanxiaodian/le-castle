import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { dirname } from 'path'

@Injectable()
export default class dBConfigService implements TypeOrmOptionsFactory {
  constructor(readonly configService: ConfigService) {
    this.configService = configService
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return Object.assign(
      {
        entities: [`${dirname(require.main.filename)}/**/*.entity{.ts,.js}`],
        migrations: ['migration/*.js'],
        cli: {
          migrationsDir: 'migration',
        },
      },
      this.configService.get('db'),
    )
  }
}
