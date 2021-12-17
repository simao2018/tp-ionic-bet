import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetLoginRequest, GetUserResponse, UserDto } from "./user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "../../../shared/jwtpayload";
import { Response } from "express";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,

    ) {

    }

    async getUser(id: string): Promise<GetUserResponse> {
        const userResponse = new GetUserResponse();
        try {
            const response = await this.userRepository.findOne({ where: { 'id': id } });

            userResponse.success = true;
            if (response) {
                userResponse.user = response.toDto();
            }
        } catch (error) {
            console.log(error.message);
            userResponse.handleError(error.message);
        }

        return userResponse;
    }

    async save(user: UserDto) {
        try {
            await this.userRepository.save(user);
        } catch (error) {
            console.log(error);
        }
    }

    public async validateUser(request: GetLoginRequest) {
        let response = new GetUserResponse();
        try {

            if (!request?.email || !request.password)
                throw new Error('no request sended');


            const userResponse = await this.userRepository.findOne({ where: { email: request.email } });
            if (!userResponse)
                throw new NotFoundException('cet utilisateur n\'existe pas.');

            if (!await bcrypt.compare(request.password, userResponse.password))
                throw new NotFoundException('password or user not found')


            const payload: JwtPayload = {
                id: userResponse.id,
                email: userResponse.email,
                credit: userResponse.credit,
            }

            const jwt = await this.jwtService.signAsync(payload);
            console.log(`🚀 ~ jwt`, jwt);

            response.user = userResponse.toDto();
            response.user.access_token = jwt;

            // res.cookie('token', jwt);

            console.log(`🚀 ~ response`, response);


            response.success = true;
        } catch (err) {
            console.log(`🚀 ~ err`, err);
            response.handleError(err.message);

        }
        return response;
    }

}