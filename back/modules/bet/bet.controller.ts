import { Body, Controller, Get, HttpCode, Param, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";
import { User } from "../user/user.entity";
import { BetDto, GetBetAndMatchComputer, GetBetRequest, GetBetResponse, GetBetsResponse } from "./bet.dto";
import { Bet, BetResult, BetState } from "./bet.entity";
import { Result, ResultType } from "../../entities/result.entity";
import { MatchResult } from "../../../shared/constant";
import { Match } from "../match/match.entity";
import { v4 as guid } from 'uuid';



@ApiTags('bet')
@Controller('bet')
export class BetController {
    constructor(
        @InjectRepository(Bet)
        private betRepository: Repository<Bet>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Match)
        private matchRepository: Repository<Match>
    ) { }

    @Get()
    @ApiOperation({ summary: 'get all bets', operationId: 'getBets' })
    @ApiResponse({ status: 200, description: 'get all bets', type: GetBetsResponse })
    async getAllBets(@Body() request: GetBetRequest): Promise<GetBetsResponse> {
        const response = new GetBetsResponse();
        try {

            let findOptions: FindManyOptions<Bet>;

            if (request && request.id_user)
                findOptions = { where: { id_user: request.id_user } };

            const getResponse = await this.betRepository.find(findOptions);

            response.bets = getResponse ? getResponse.map(x => x.toDto()) : [];
            response.success = true;

        } catch (e) {
            response.handleError(e);
        }
        return response;
    }

    @Post()
    @ApiOperation({ summary: 'save bet', operationId: 'saveBet' })
    @ApiResponse({ status: 200, description: 'save bet', type: GetBetResponse })
    @HttpCode(200)
    async saveBet(@Body() betRequest: BetDto): Promise<GetBetResponse> {
        // console.log("🚀 ~ saveBet ~ betRequest", betRequest)
        const response = new GetBetResponse();
        try {

            const bet = new Bet();
            betRequest.state = BetState.IN_PROGRESS;

            betRequest.ref = guid();
            console.log("🚀 ~ saveBet ~ betRequest.ref", betRequest.ref)

            bet.fromDto(betRequest);

            const betResponse = await this.betRepository.save(bet);

            const userResponse = await this.userRepository.findOne(betRequest.id_user);
            if (userResponse && userResponse.credit > 0) {
                console.log("🚀 ~ saveBet ~ userResponse", userResponse)
                userResponse.credit -= betRequest.mise;

                await this.userRepository.save(userResponse);
            }

            response.bet = betResponse.toDto();
            response.success = true;

        } catch (e) {
            response.handleError(e);
        }
        return response;
    }

    @Post('/simulate/:betId')
    @ApiOperation({ summary: 'simulate match', operationId: 'simulateMatch' })
    @ApiResponse({ status: 200, description: 'simulate match', type: GetBetAndMatchComputer })
    async simulateMatch(@Param('betId') betId: string): Promise<GetBetAndMatchComputer> {
        const response = new GetBetAndMatchComputer();
        try {
            const matchsRespone = await this.matchRepository.find({ relations: ['result'] });
            console.log("🚀 ~ simulateMatch ~ matchsRespone", matchsRespone)
            if (matchsRespone && matchsRespone?.length > 0) {
                const betResponse = await this.betRepository.findOne({
                    where: { 'id': betId, state: BetState.IN_PROGRESS },
                    relations: ['matchs_selected', 'matchs_selected.result']
                });

                for (const match of matchsRespone) {
                    const result = new Result();
                    result.type = ResultType.COMPUTER;

                    result.score_away = Math.floor(Math.random() * 3);
                    result.score_home = Math.floor(Math.random() * 4);

                    if (result.score_home > result.score_away)
                        result.value = MatchResult.HOME;
                    else if (result.score_home === result.score_away)
                        result.value = MatchResult.DRAW;
                    else
                        result.value = MatchResult.AWAY;


                    match.result = result;
                    const matchRes = await this.matchRepository.save(match);

                    console.log("🚀 ~ simulateMatch ~ matchRes", matchRes);
                }

                const getMatchBetOn = matchsRespone.filter(x => betResponse.matchs_selected.some(y => x.id === y.id_match));
                response.matchs = getMatchBetOn;



                betResponse.result = getMatchBetOn.every(x => betResponse.matchs_selected.every(y => x.result.value === y.result.value)) ? BetResult.WIN : BetResult.LOST;
                betResponse.state = BetState.END;

                const betResponseSave = await this.betRepository.save(betResponse);

                response.bet = betResponseSave.toDto();
                response.success = true;

            }

        } catch (e) {
            response.handleError(e);
        }
        return response;
    }
}