import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../entities/base.entity";
import { MatchSelected } from "../match/match-selected.entity";
import { User } from "../user/user.entity";
import { BetDto } from "./bet.dto";

export enum BetState {
    IN_PROGRESS = "in_progress",
    END = "end",
    NOT_INIT = "not_init"
}

export enum BetResult {
    WIN = "win",
    LOST = "lost",
    UNINITIALIZED = "uninitialized"
}

@Entity({ name: 'bet' })
export class Bet extends BaseEntity {

    @OneToMany(() => MatchSelected, match_selected => match_selected.bet, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    matchs_selected: MatchSelected[];

    @ManyToOne(() => User, user => user.bets)
    @JoinColumn({ name: 'id_user' })
    user: User;

    @Column('varchar', { name: 'id_user', length: 36 })
    id_user: string;


    @Column('enum', { name: 'state', enum: BetState, default: BetState.NOT_INIT })
    state: BetState;

    @Column('enum', { name: 'result', enum: BetResult, default: BetResult.UNINITIALIZED })
    result: BetResult;

    @Column('float', { name: 'mise', nullable: false })
    mise: number;

    @Column('float', { name: 'quote_total', nullable: false })
    quote_total: number;

    @Column('float', { name: 'gain', nullable: false })
    gain: number;

    toDto(): BetDto {
        return {
            id: this.id,
            state: this.state,
            result: this.result,
            mise: this.mise,
            quote_total: this.quote_total,
            gain: this.gain,
            id_user: this.id_user,
            user: this.user ? this.user.toDto() : null,
            matchsSelected: this.matchs_selected ? this.matchs_selected.map(x => x.toDto()) : []
        }
    }

    fromDto(dto: BetDto) {
        this.id = dto.id;
        this.state = dto.state;
        this.result = dto.result;
        this.mise = dto.mise;
        this.quote_total = dto.quote_total;
        this.gain = dto.gain;
        this.id_user = dto.id_user;

        if (dto.matchsSelected) {
            this.matchs_selected = [];

            for (const item of dto.matchsSelected) {
                const match_selected = new MatchSelected();
                match_selected.fromDto(item);
                this.matchs_selected.push(match_selected);
            }
        }
    }
}