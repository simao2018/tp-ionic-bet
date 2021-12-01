import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetBetsResponse } from "./bet.dto";
import { Bet } from "./bet.entity";

@ApiTags('bet')
@Controller('bet')
export class BetController {
    constructor(
        @InjectRepository(Bet)
        private betRepository: Repository<Bet>
    ) { }

    @Get()
    @ApiOperation({ summary: 'get all bets', operationId: 'getBets' })
    @ApiResponse({ status: 200, description: 'get all bets', type: GetBetsResponse })
    async getAllBets(): Promise<GetBetsResponse> {
        const response = new GetBetsResponse();
        try {

            const getResponse = await this.betRepository.find();

            response.bets = getResponse ? getResponse : [];
            response.success = true;

        } catch (e) {
            response.handleError(e);
        }
        return response;
    }
}