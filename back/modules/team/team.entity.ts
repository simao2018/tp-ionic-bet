import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "../../entities/base.entity";
import { Match } from "../match/match.entity";
import { TeamDto } from "./team.dto";

@Entity({ name: 'team' })
export class Team extends BaseEntity {
    @Column('varchar', { name: 'label', length: 36, nullable: false })
    label: string;

    toDto(): TeamDto {
        return {
            id: this.id,
            label: this.label,
        }
    }

    fromDto(dto: TeamDto) {
        this.id = dto.id;
        this.label = dto.label;
    }
}