import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseEntity } from "../../entities/base.entity";
import { Result } from "../../entities/result.entity";
import { Team } from "../team/team.entity";
import { MatchDto } from "./match.dto";

@Entity({ name: 'match' })
export class Match extends BaseEntity {
    @Column('float', { name: 'quote_home', nullable: false })
    quote_home: number;

    @Column('float', { name: 'quote_away', nullable: false })
    quote_away: number;

    @Column('float', { name: 'quote_null', nullable: false })
    quote_null: number;

    @Column('varchar', { name: 'id_team_home', nullable: false })
    id_team_home: string;

    @OneToOne(() => Team, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'id_team_home' })
    team_home?: Team;

    @Column('varchar', { name: 'id_team_away', nullable: false })
    id_team_away?: string;

    @OneToOne(() => Team, { onDelete: 'NO ACTION' })
    @JoinColumn({ name: 'id_team_away' })
    team_away: Team;

    @Column('varchar', { name: 'id_result', length: 35, nullable: true })
    id_result?: string;

    @OneToOne(() => Result)
    @JoinColumn({ name: 'id_result' })
    result?: Result;

    toDto(): MatchDto {
        return {
            id: this.id,
            quote_home: this.quote_home,
            quote_away: this.quote_away,
            id_team_home: this.id_team_home,
            id_team_away: this.id_team_away,
            result: this.result ? this.result.toDto() : null,
            id_result: this.id_result,
            team_away: this.team_away ? this.team_away.toDto() : null,
            team_home: this.team_home ? this.team_home.toDto() : null,
        }
    }

    fromDto(dto: MatchDto) {
        this.id = dto.id;
        this.id_result = dto.id_result;
        this.id_team_away = dto.id_team_away;
        this.id_team_home = dto.id_team_home;
        this.quote_away = dto.quote_away;
        this.quote_home = dto.quote_home;
        this.quote_null = dto.quote_null;
    }
}