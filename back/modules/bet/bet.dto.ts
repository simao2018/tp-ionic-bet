import { ApiPropertyOptional } from "@nestjs/swagger";
import { GenericResponse } from "../generic/genericResponse";
import { MatchSelectedDto } from "../match/match.dto";
import { UserDto } from "../user/user.dto";
import { BetResult, BetState } from "./bet.entity";

export class BetDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional()
    id_user?: string;

    @ApiPropertyOptional({ enum: BetState })
    state?: BetState;

    @ApiPropertyOptional({ enum: BetResult })
    result?: BetResult;

    @ApiPropertyOptional()
    mise: number;

    @ApiPropertyOptional()
    quote_total?: number;

    @ApiPropertyOptional()
    gain: number;

    @ApiPropertyOptional({ type: () => UserDto })
    user: UserDto;

    @ApiPropertyOptional({ type: () => MatchSelectedDto, isArray: true })
    matchsSelected: MatchSelectedDto[]
}

export class GetBetResponse extends GenericResponse {
    @ApiPropertyOptional({ type: () => BetDto, isArray: false })
    bet: BetDto
}

export class GetBetsResponse extends GenericResponse {
    @ApiPropertyOptional({ type: () => BetDto, isArray: true })
    bets: BetDto[]
}