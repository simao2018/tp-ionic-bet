import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchSelected } from "../match/match-selected.entity";
import { Match } from "../match/match.entity";
import { User } from "../user/user.entity";
import { BetController } from "./bet.controller";
import { Bet } from "./bet.entity";

@Module({
    imports: [TypeOrmModule.forFeature([
        Bet,
        User,
        Match,
    ])],
    controllers: [BetController],
})

export class BetModule { }