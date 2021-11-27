import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BetController } from "./bet.controller";
import { Bet } from "./bet.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Bet])],
    controllers: [BetController],
})

export class BetModule { }