import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from '../modules/user/user.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post()
  // createOrUpdate(@Body() request: UserDto) {
  //   console.log(request);
  // }
}
