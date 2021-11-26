import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "../modules/user/user.dto";
import { User } from "../modules/user/user.entity";
import * as bcrypt from 'bcrypt'


@Injectable()
export class DatabaseService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {

    }

    async createInitialUser() {
        await this.createUser({ email: 'test@test.com', password: 'test', credit: 10000 });
    }

    private async createUser(user: UserDto) {
        const getUserResponse = await this.userRepository.findOne({ where: { email: user.email } })
        if (!getUserResponse) {
            console.log('create user...');
            user.password = await bcrypt.hash(user.password, 10);
            await this.userRepository.save(user);
            console.log('create user success');
        }
    }
}