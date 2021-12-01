import { Controller } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"


@ApiTags('team')
@Controller('team')
export class TeamController {
    constructor() { }


}