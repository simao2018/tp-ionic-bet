import { Column, Entity, OneToOne } from "typeorm";
import { ResultDto } from "../dto/result.dto";
import { BaseEntity } from "./base.entity";
import { MatchResult } from "../../shared/constant";

export enum ResultType {
    USER = "USER",
    COMPUTER = "COMPUTER",

    UNDEFINED = "UNDEFINED",
}


@Entity({ name: 'result' })
export class Result extends BaseEntity {
    @Column('enum', { name: 'value', enum: MatchResult, default: MatchResult.UNSET })
    value: MatchResult;

    @Column('enum', { name: 'type', enum: ResultType, default: ResultType.UNDEFINED })
    type: ResultType;

    @Column('int', { name: 'score_home', nullable: true })
    score_home: number;

    @Column('int', { name: 'score_away', nullable: true })
    score_away: number;

    toDto(): ResultDto {
        return {
            id: this.id,
            value: this.value,
            type: this.type,
            score_away: this.score_away,
            score_home: this.score_home,
        }
    }

    fromDto(dto: ResultDto) {
        this.id = dto.id;
        this.value = dto.value;
        this.type = dto.type;
        this.score_away = dto.score_away;
        this.score_home = dto.score_home;
    }
}