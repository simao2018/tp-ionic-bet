import { UserDto } from "../providers/api-client.generated";


export class AuthService {

    public static currentUser: UserDto;
    public static isConnected: boolean = false;
}