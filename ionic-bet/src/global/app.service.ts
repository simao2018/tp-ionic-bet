import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BetDto, MatchSelectedDto, ResultDto, TeamDto, UserDto } from "../providers/api-client.generated";
import jwt_decode from "jwt-decode";


@Injectable({ providedIn: 'root' })
export class AppService {
    public static matchSelectedCount = new BehaviorSubject<number>(0);
    public static AuthUser: UserDto;
    public static userCredit = new BehaviorSubject<number>(0);

    constructor() {
        this.setConnectedUser();
    }

    async setConnectedUser() {
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            const { id, email, credit } = jwt_decode(access_token) as UserDto;

            AppService.AuthUser = {
                id: id,
                email: email,
                credit: AppService.AuthUser?.credit ?? credit,
                bets: [
                    { state: BetDto.StateEnum.InProgress, id_user: id }
                ]
            };
            AppService.userCredit.next(AppService.AuthUser.credit);
            AppService.matchSelectedCount.next(0);
        }
    }

    private getTeamSelected(match_selected: MatchSelectedDto): TeamDto | string {
        let valueToReturn: TeamDto | string;
        switch (match_selected?.result?.value) {
            case ResultDto.ValueEnum.Home:
                valueToReturn = match_selected.match.team_home;
                break;
            case ResultDto.ValueEnum.Away:
                valueToReturn = match_selected.match.team_away;
                break;
            default:
                valueToReturn = 'Match null';
        }
        return valueToReturn;
    }

    getTeamLabel(match_selected: MatchSelectedDto): string {
        return (this.getTeamSelected(match_selected) && typeof this.getTeamSelected(match_selected) === 'string') ? (this.getTeamSelected(match_selected) as string) : (this.getTeamSelected(match_selected) as TeamDto).label;
    }

    getQuoteSelected(match_selected: MatchSelectedDto): number {
        return (this.getTeamSelected(match_selected) && typeof this.getTeamSelected(match_selected) === 'string') ? match_selected.match.quote_null : ((this.getTeamSelected(match_selected) as TeamDto).id === match_selected.match.id_team_home ? match_selected.match.quote_home : match_selected.match.quote_away);
    }

    calculCredit() {

        if (AppService.AuthUser.bets.find(x => x.state === BetDto.StateEnum.InProgress)?.mise) {
            AppService.AuthUser.credit -= AppService.AuthUser.bets.find(x => x.state === BetDto.StateEnum.InProgress).mise;
            AppService.userCredit.next(AppService.AuthUser.credit);
        }
    }

    getTotalQuote(match_selected_list: MatchSelectedDto[]) {
        return match_selected_list?.reduce((a, b) => { return a + this.getQuoteSelected(b) }, 0);
    }

    getPotentialWin(match_selected_list: MatchSelectedDto[], mise: number) {
        return this.getTotalQuote(match_selected_list) * mise ? this.getTotalQuote(match_selected_list) * mise : 0;
    }

    getBetInProgressMatch(): number {
        let value: number;
        value = AppService.AuthUser.bets[0].matchsSelected?.length;
        return !value ? 0 : value;
    }
}