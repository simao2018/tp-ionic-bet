import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GenericResponse } from "../generic/genericResponse";
import { MatchSelected } from "./match-selected.entity";
import { GetMatchList, MatchSelectedDto } from "./match.dto";
import { Match } from "./match.entity";

@ApiTags('match')
@Controller('match')
export class MatchController {
    constructor(
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,

        @InjectRepository(MatchSelected)
        private matchSelectedRepository: Repository<MatchSelected>,
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

    @Post('saveMatchSelected')
    @ApiOperation({ summary: 'add match selected', operationId: 'saveMatchSelected' })
    @ApiResponse({ status: 200, description: 'add match selected', type: GenericResponse })
    async saveMatchSelected(@Body() matchSelected: MatchSelectedDto): Promise<GenericResponse> {
        console.log("🚀 ~ saveMatchSelected ~ matchSelected", matchSelected)
        const response = new GenericResponse();
        try {

            await this.matchSelectedRepository.save(matchSelected);
            response.success = true;
        } catch (e) {
            response.handleError(e);
        }
        return response;
    }


}