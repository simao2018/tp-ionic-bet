import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Team } from "../team/team.entity";
import { GetMatchList } from "./match.dto";
import { Match } from "./match.entity";

@ApiTags('match')
@Controller('match')
export class MatchController {
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>
    ) { }

    @Get()
    @ApiOperation({ summary: 'get all match', operationId: 'getMatchs' })
    @ApiResponse({ status: 200, description: 'get all match', type: GetMatchList })
    async getMatchs(): Promise<GetMatchList> {
        const response = new GetMatchList();
        try {

            const getMatchResponse = await this.matchRepository.find({ relations: ['team_home', 'team_away'] });
            response.matchs = getMatchResponse ? getMatchResponse : [];

            response.success = true;

        } catch (e) {
            response.handleError(e);
        }
        return response;
    }
}