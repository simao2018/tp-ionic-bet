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

    toDto(): ResultDto {
        return {
            id: this.id,
            value: this.value,
            type: this.type,
        }
    }

    fromDto(dto: Result) {
        this.id = dto.id;
        this.value = dto.value;
        this.type = dto.type;
    }
}