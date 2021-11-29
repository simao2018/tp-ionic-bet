import { ApiPropertyOptional } from "@nestjs/swagger";

export class TeamDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional()
    label?: string;

    @ApiPropertyOptional()
    logo?: string;
}

