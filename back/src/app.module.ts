import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { UserModule } from '../modules/user/user.module';
import { DatabaseService } from './database.service';
import { User } from '../modules/user/user.entity';
import * as EnvironnementJsonFile from '../environment/env.json'
import { BetModule } from '../modules/bet/bet.module';
import { TeamModule } from '../modules/team/team.module';
import { MatchModule } from '../modules/match/match.module';
import { Team } from '../modules/team/team.entity';
import { Match } from '../modules/match/match.entity';


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
      logging: false,
    }),
    UserModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Team]),
    TypeOrmModule.forFeature([Match]),
    BetModule,
    TeamModule,
    MatchModule,
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
