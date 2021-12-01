import { ApiPropertyOptional } from "@nestjs/swagger";
import { MatchResult } from "../../shared/constant";

export class ResultDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional({ enum: MatchResult })
    value: MatchResult;
}


