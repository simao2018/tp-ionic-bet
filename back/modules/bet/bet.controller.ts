import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('bet')
@Controller('bet')
export class BetController {
    constructor() { }
}