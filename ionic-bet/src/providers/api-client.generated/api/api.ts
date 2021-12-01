export * from './bet.service';
import { BetService } from './bet.service';
export * from './default.service';
import { DefaultService } from './default.service';
export * from './match.service';
import { MatchService } from './match.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [BetService, DefaultService, MatchService, UserService];
