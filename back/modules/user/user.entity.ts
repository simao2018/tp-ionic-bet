import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../entities/base.entity";
import { Bet } from "../bet/bet.entity";
import { UserDto } from "./user.dto";

@Entity('user')
export class User extends BaseEntity {
    @Column('varchar', { name: 'email', nullable: true, length: 36 })
    email: string;

    @Column('varchar', { name: 'password', nullable: true, length: 255 })
    password: string;

    @Column('float', { name: 'credit', nullable: true })
    credit: number;

    @OneToMany(() => Bet, bet => bet.user)
    bets: Bet[]
    toDto(): UserDto {
        return {
            id: this.id,
            email: this.email,
            credit: this.credit,
        }
    }

    fromDto(dto: UserDto) {
        this.id = dto.id;
        this.email = dto.email;
        this.password = dto.password;
        this.credit = dto.credit;
    }
}