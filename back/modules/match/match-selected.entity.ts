import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../entities/base.entity";
import { Bet } from "../bet/bet.entity";
import { MatchSelectedDto } from "./match.dto";
import { Match } from "./match.entity";

@Entity({ name: 'match_selected' })
export class MatchSelected extends BaseEntity {
    @Column('varchar', { name: 'id_match', nullable: false })
    id_match: string;

    @OneToOne(() => Match)
    @JoinColumn({ name: 'id_match' })
    match: Match;

    @ManyToOne(() => Bet, bet => bet.matchs_selected)
    bet: Bet;

    toDto(): MatchSelectedDto {
        return {
            id: this.id,
            id_match: this.id_match,
            match: this.match ? this.match.toDto() : null,
            bet: this.bet ? this.bet.toDto() : null,
        }
    }

    fromDto(dto: MatchSelectedDto) {
        this.id = dto.id;
        this.id_match = dto.id_match;
    }
}