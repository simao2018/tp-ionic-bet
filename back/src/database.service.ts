import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "../modules/user/user.dto";
import { User } from "../modules/user/user.entity";
import * as bcrypt from 'bcrypt'
import { Match } from "../modules/match/match.entity";
import { MatchDto } from "../modules/match/match.dto";
import { TeamDto } from "../modules/team/team.dto";
import { Team } from "../modules/team/team.entity";


@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Match)
        private matchRepository: Repository<Match>,
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
    ) {

    }

    async createInitialUser() {
        await this.createUser({ email: 'test@test.com', password: 'test', credit: 10000 });
        await this.createInitialTeams();
        await this.createInitialMatch();
    }

    private async createUser(user: UserDto) {
        const getUserResponse = await this.userRepository.findOne({ where: { email: user.email } })
        if (!getUserResponse) {
            console.log('create user...');
            user.password = await bcrypt.hash(user.password, 10);
            await this.userRepository.save(user);
            console.log('create user success');
        }
    }

    private async createInitialMatch() {
        const teams = await this.teamRepository.find();

        if (teams.length) {
            for (let i = 0; i < teams.length; i += 2) {
                const team_home: TeamDto = teams[i]?.toDto();
                const team_away: TeamDto = teams[i + 1]?.toDto();

                if (!team_away || !team_home)
                    break;

                const matchList: MatchDto[] = [
                    {
                        id_team_away: team_away.id,
                        id_team_home: team_home.id,
                        quote_away: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
                        quote_null: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
                        quote_home: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
                        team_home: team_home,
                        team_away: team_away,
                    }
                ];

                for (const match of matchList) {
                    const getMatch = await this.matchRepository.findOne({ where: { id: match.id } });
                    if (getMatch)
                        continue;

                    console.log(`add match : ${match.team_home?.label} VS ${match.team_away?.label}`);
                    await this.matchRepository.save(match);
                }
            }
        }
    }

    private async createInitialTeams() {
        const teams: TeamDto[] = [
            {
                label: 'Olympique de Marseille',
            },
            {
                label: 'Olympique Lyonnais'
            },
            {
                label: 'Paris St-Germain'
            },
            {
                label: 'Real Madrid'
            },
            {
                label: 'Fc Barcelona'
            },
            {
                label: 'Bayern Munich FC'
            },
            {
                label: 'Manchester city'
            },
            {
                label: 'Manchester utd'
            },
            {
                label: 'Dortmund FC'
            },
            {
                label: 'Chelsea FC'
            },
            {
                label: 'Arsenal FC'
            },
            {
                label: 'Juventus'
            }
        ];

        for (const team of teams) {
            const getTeam = await this.teamRepository.findOne({ where: { label: team.id } });
            if (getTeam)
                continue;
            console.log(`add team : ${team.label}`);
            await this.teamRepository.save(team);
        }
    }
}