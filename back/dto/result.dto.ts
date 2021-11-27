import { ApiPropertyOptional } from "@nestjs/swagger";
import { MatchResult } from "../entities/result.entity";

export class ResultDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional({ enum: MatchResult })
    value: MatchResult;
}


