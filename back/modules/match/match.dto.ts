import { ApiPropertyOptional } from "@nestjs/swagger";
import { ResultDto } from "../../dto/result.dto";
import { BetDto } from "../bet/bet.dto";
import { GenericResponse } from "../generic/genericResponse";
import { TeamDto } from "../team/team.dto";

export class MatchDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional()
    id_team_home?: string;

    @ApiPropertyOptional()
    id_team_away?: string;

    @ApiPropertyOptional()
    quote_home?: number;

    @ApiPropertyOptional()
    quote_away?: number;

    @ApiPropertyOptional()
    quote_null?: number;

    @ApiPropertyOptional({ type: () => ResultDto, isArray: false })
    result?: ResultDto;

    @ApiPropertyOptional()
    id_result?: string;

    @ApiPropertyOptional({ type: () => TeamDto, isArray: false })
    team_home?: TeamDto;

    @ApiPropertyOptional({ type: () => TeamDto, isArray: false })
    team_away?: TeamDto;
}

export class MatchSelectedDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional()
    id_match?: string;

    @ApiPropertyOptional({ type: () => MatchDto, isArray: false })
    match?: MatchDto;

    @ApiPropertyOptional({ type: () => BetDto, isArray: false })
    bet: BetDto;

    @ApiPropertyOptional({ type: () => ResultDto, isArray: false })
    result?: ResultDto

    @ApiPropertyOptional()
    id_result?: string;

    @ApiPropertyOptional()
    id_bet?: string;
}

export class GetMatchList extends GenericResponse {
    @ApiPropertyOptional({ type: () => MatchDto, isArray: true })
    matchs: MatchDto[];
}

export class GetMatch extends GenericResponse {
    @ApiPropertyOptional({ type: () => MatchDto, isArray: false })
    match: MatchDto;
}
