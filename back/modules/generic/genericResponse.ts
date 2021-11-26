import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column } from "typeorm";

export class GenericResponse {
    @ApiProperty()
    succes: boolean;

    @ApiProperty()
    message: string;

    constructor() {
        //
    }

    public handleError(error: any) {
        this.succes = false;

        this.message = error.message;
    }
}