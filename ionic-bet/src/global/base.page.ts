import { BehaviorSubject } from "rxjs";
import { BetDto, MatchSelectedDto, ResultDto, TeamDto, UserDto } from "../providers/api-client.generated";
import jwt_decode from "jwt-decode";

export abstract class BasePage {
    public isConnectedSubject = new BehaviorSubject<boolean>(false);
    public AuthUserSubject = new BehaviorSubject<UserDto>(null);
    public AuthUser: UserDto;
    public isConnected = this.isConnectedSubject.getValue();
    public isLoading = new BehaviorSubject<boolean>(false);
    public loading: boolean = false;

    constructor(
    ) {
        this.setConnectedUser();
    }

    async setConnectedUser() {
        const access_token = localStorage.getItem('access_token');

        if (access_token) {
            const { id, email, credit } = jwt_decode(access_token) as UserDto;
            this.AuthUser = {
                id: id,
                email: email,
                credit: credit,
                bets: [
                    { state: BetDto.StateEnum.InProgress, id_user: id }
                ]
            };
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

        if (this.AuthUser.bets.find(x => x.state === BetDto.StateEnum.InProgress)?.mise)
            this.AuthUser.credit -= this.AuthUser.bets.find(x => x.state === BetDto.StateEnum.InProgress).mise;
    }

    getTotalQuote(match_selected_list: MatchSelectedDto[]) {
        return match_selected_list?.reduce((a, b) => { return a + this.getQuoteSelected(b) }, 0);
    }

    getPotentialWin(match_selected_list: MatchSelectedDto[], mise: number) {
        return this.getTotalQuote(match_selected_list) * mise ? this.getTotalQuote(match_selected_list) * mise : 0;
    }

    /*   test() {
           console.log("🚀 ~ getBetInProgressMatch ~ this.AuthUser", this.AuthUser.bets[0]?.matchsSelected?.length)
       }
   */
    getBetInProgressMatch(): number {
        let value: number;
        value = this.AuthUser.bets[0].matchsSelected?.length;
        return !value ? 0 : value;
    }

}