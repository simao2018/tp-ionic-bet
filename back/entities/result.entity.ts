import { Column, Entity, OneToOne } from "typeorm";
import { ResultDto } from "../dto/result.dto";
import { BaseEntity } from "./base.entity";
import { MatchResult } from "../../shared/constant";


@Entity({ name: 'result' })
export class Result extends BaseEntity {
    @Column('enum', { name: 'value', enum: MatchResult, default: MatchResult.UNSET })
    value: MatchResult;

    toDto(): ResultDto {
        return {
            id: this.id,
            value: this.value,
        }
    }

    fromDto(dto: Result) {
        this.id = dto.id;
        this.value = dto.value;
    }
}