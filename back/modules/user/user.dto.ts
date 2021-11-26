import { ApiPropertyOptional } from "@nestjs/swagger";
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