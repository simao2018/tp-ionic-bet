import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserModule } from '../modules/user/user.module';
import { DatabaseService } from './database.service';
import { User } from '../modules/user/user.entity';
import * as EnvironnementJsonFile from '../environment/env.json'


const PATH = process.cwd()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: EnvironnementJsonFile.DB_TYPE as any,
      host: EnvironnementJsonFile.DB_HOST,
      port: EnvironnementJsonFile.DB_PORT,
      username: EnvironnementJsonFile.DB_USERNAME,
      database: EnvironnementJsonFile.DB_NAME,
      password: EnvironnementJsonFile.DB_PASSWORD,
      entities: [
        `${PATH}/entities/**/*.entity{.ts,.js}`, `${PATH}/**/**/*.entity{.ts,.js}`
      ],
      synchronize: true,
      // logging: true,
    }),
    UserModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DatabaseService,
  ],
})
export class AppModule {
  constructor(
    private dbService: DatabaseService
  ) {
    this.init()
  }
  async init() {
    await this.dbService.createInitialUser();
  }
}
