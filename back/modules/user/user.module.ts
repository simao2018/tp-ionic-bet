import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Module({
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'secretcle',
            signOptions: {
                expiresIn: '2h',
            }
        }),
    ],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {}
