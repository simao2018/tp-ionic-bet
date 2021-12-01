import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamController } from "./team.controller";
import { Team } from "./team.entity";

@Module(
    {
        imports: [
            TypeOrmModule.forFeature([Team])
        ],
        controllers: [TeamController],
    }
)

export class TeamModule {

}