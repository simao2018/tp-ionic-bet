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
                        quote_away: Math.floor(Math.random() * (3.9 - 1.8 + 1)) + 1.8,
                        quote_null: Math.floor(Math.random() * (1.9 - 1.1 + 1)) + 1.1,
                        quote_home: Math.floor(Math.random() * (1.9 - 1.1 + 1)) + 1.1,
                        team_home: team_home,
                        team_away: team_away,
                    }
                ];

                for (const match of matchList) {
                    const getMatch = await this.matchRepository.findOne({ where: { id_team_home: match.id_team_home } });
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
                logo: 'https://ssl.gstatic.com/onebox/media/sports/logos/KfBX1kHNj26r9NxpqNaTkA_96x96.png',
                sigle: 'OM'
            },
            {
                label: 'Olympique Lyonnais',
                logo: 'https://ssl.gstatic.com/onebox/media/sports/logos/SrKK55dUkCxe4mJsyshfCg_96x96.png',
                sigle: 'OL'
            },
            {
                label: 'Paris St-Germain',
                logo: 'https://i1.wp.com/i.imgur.com/v3w1LrB.png?resize=256%2C256&ssl=1',
                sigle: 'PSG',
            },
            {
                label: 'Real Madrid',
                logo: 'https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png',
                sigle: 'R. Madrid'
            },
            {
                label: 'Fc Barcelona',
                logo: 'https://icons.iconarchive.com/icons/giannis-zographos/spanish-football-club/256/FC-Barcelona-icon.png',
                sigle: 'FCB'
            },
            {
                label: 'Bayern Munich FC',
                logo: 'https://cdn.icon-icons.com/icons2/1018/PNG/256/Bayern_Munchen_icon-icons.com_75868.png',
                sigle: 'Bay FC'
            },
            {
                label: 'Manchester city',
                logo: 'https://www.gamesatlas.com/images/football/teams/england/manchester-city.png',
                sigle: 'Man City'
            },
            {
                label: 'Manchester utd',
                logo: 'https://companiesmarketcap.com/img/company-logos/256/MANU.png',
                sigle: 'Man Utd'
            },
            {
                label: 'Dortmund FC',
                logo: 'https://aux.iconspalace.com/uploads/borussia-dortmund-logo-icon-256.png',
                sigle: 'Dort. FC'
            },
            {
                label: 'Chelsea FC',
                logo: 'https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Chelsea-FC-icon.png',
                sigle: 'Chel. FC'
            },
            {
                label: 'Arsenal FC',
                logo: 'https://idreamleaguesoccerkits.com/wp-content/uploads/2018/01/Arsenal-Logo-URL-512x512.png',
                sigle: 'Ars. FC'
            },
            {
                label: 'Juventus',
                logo: 'https://aux.iconspalace.com/uploads/juventus-logo-icon-256.png',
                sigle: 'Juv'
            }
        ];

        for (const team of teams) {
            const getTeam = await this.teamRepository.findOne({ where: { label: team.label } });
            if (getTeam)
                continue;
            console.log(`add team : ${team.label}`);
            await this.teamRepository.save(team);
        }
    }
}