import { Body, Controller, HttpCode, Post, Request, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { GetLoginRequest, GetUserResponse } from "./user.dto";
import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {

    }

    @Post()
    @ApiOperation({ summary: 'log user', operationId: 'logUser' })
    @ApiResponse({ status: 200, description: 'Log user', type: GetUserResponse })
    @HttpCode(200)
    async logUser(@Body() request: GetLoginRequest) {
        console.log('request : ', request);
        return await this.userService.validateUser(request);
    }

}