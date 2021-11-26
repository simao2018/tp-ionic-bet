import { BehaviorSubject } from "rxjs";
import { UserDto } from "../providers/api-client.generated";

export class GlobalService {
  public static isConnected = new BehaviorSubject<boolean>(false);
  public static userConnected = new BehaviorSubject<UserDto>(null);
  constructor() { }
}
