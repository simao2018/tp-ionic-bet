import { ApiPropertyOptional } from "@nestjs/swagger";
import { MatchResult } from "../../shared/constant";
import { ResultType } from "../entities/result.entity";

export class ResultDto {
    @ApiPropertyOptional()
    id?: string;

    @ApiPropertyOptional({ enum: MatchResult })
    value: MatchResult;

    @ApiPropertyOptional({ enum: ResultType })
    type: ResultType;
}


