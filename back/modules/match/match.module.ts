import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchSelected } from "./match-selected.entity";
import { MatchController } from "./match.controller";
import { Match } from "./match.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Match, MatchSelected])
    ],
    controllers: [MatchController]
})

export class MatchModule { }