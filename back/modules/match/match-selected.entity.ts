import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "../../entities/base.entity";
import { Result } from "../../entities/result.entity";
import { Bet } from "../bet/bet.entity";
import { MatchSelectedDto } from "./match.dto";
import { Match } from "./match.entity";

@Entity({ name: 'match_selected' })
export class MatchSelected extends BaseEntity {
    @Column('varchar', { name: 'id_match', nullable: false })
    id_match: string;

    @Column('varchar', { name: 'id_bet', nullable: false, length: 36 })
    id_bet: string;

    @ManyToOne(() => Match)
    @JoinColumn({ name: 'id_match' })
    match: Match;

    @ManyToOne(() => Bet, bet => bet.matchs_selected, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_bet' })
    bet: Bet;

    @Column('varchar', { name: 'id_result', length: 36, nullable: true })
    id_result: string;

    @OneToOne(() => Result, { cascade: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_result' })
    result: Result;

    toDto(): MatchSelectedDto {
        return {
            id: this.id,
            id_match: this.id_match,
            id_result: this.id_result,
            match: this.match ? this.match.toDto() : null,
            bet: this.bet ? this.bet.toDto() : null,
            result: this.result ? this.result.toDto() : null,
            id_bet: this.id_bet,
        }
    }

    fromDto(dto: MatchSelectedDto) {
        console.log("🚀 ~ fromDto ~ dto - match_selected", dto)
        this.id = dto.id;
        this.id_match = dto.id_match;
        this.id_result = dto.id_result;
        this.id_bet = dto.id_bet;
        if (dto.result) {
            const result = new Result();
            result.fromDto(dto.result);
            this.result = result;
        }

    }
}