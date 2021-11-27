import { ApiPropertyOptional } from "@nestjs/swagger";
import { BetDto } from "../bet/bet.dto";
import { Bet } from "../bet/bet.entity";
import { GenericResponse } from "../generic/genericResponse";

export class UserDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional()
    email?: string;

    @ApiPropertyOptional()
    password?: string;

    @ApiPropertyOptional()
    credit?: number;

    @ApiPropertyOptional({ type: () => BetDto, isArray: true })
    bets?: BetDto[];

    @ApiPropertyOptional()
    access_token?: string;
}

export class GetUserResponse extends GenericResponse {
    @ApiPropertyOptional({ type: () => UserDto })
    user?: UserDto;
}

export class GetLoginRequest {
    @ApiPropertyOptional()
    email?: string;

    @ApiPropertyOptional()
    password?: string;
}