import { BehaviorSubject } from "rxjs";
import { BetDto, MatchSelectedDto, ResultDto, TeamDto, UserDto } from "../providers/api-client.generated";
import jwt_decode from "jwt-decode";

export abstract class BasePage {
    public isConnectedSubject = new BehaviorSubject<boolean>(false);
    public AuthUserSubject = new BehaviorSubject<UserDto>(null);
    public AuthUser: UserDto;

    public UserTest = new BehaviorSubject<UserDto>(null);
    public isConnected = this.isConnectedSubject.getValue();
    public isLoading = new BehaviorSubject<boolean>(false);
    public loading: boolean = false;

    public matchSelectedCount = new BehaviorSubject<number>(0);

    constructor(
    ) {
        // this.setConnectedUser();
    }

}