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
import { BetDto } from './betDto';


export interface GetBetResponse { 
    success: boolean;
    message: string;
    bet?: BetDto;
}
