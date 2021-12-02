/**
 * Template
 * Template Web API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { UserDto } from './userDto';
import { MatchSelectedDto } from './matchSelectedDto';


export interface BetDto { 
    id?: string;
    id_user?: string;
    state?: BetDto.StateEnum;
    result?: BetDto.ResultEnum;
    mise?: number;
    quote_total?: number;
    gain?: number;
    user?: UserDto;
    matchsSelected?: Array<MatchSelectedDto>;
}
export namespace BetDto {
    export type StateEnum = 'in_progress' | 'end' | 'not_init';
    export const StateEnum = {
        InProgress: 'in_progress' as StateEnum,
        End: 'end' as StateEnum,
        NotInit: 'not_init' as StateEnum
    };
    export type ResultEnum = 'win' | 'lost' | 'uninitialized';
    export const ResultEnum = {
        Win: 'win' as ResultEnum,
        Lost: 'lost' as ResultEnum,
        Uninitialized: 'uninitialized' as ResultEnum
    };
}


