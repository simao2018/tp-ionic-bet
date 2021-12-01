import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column } from "typeorm";

export class GenericResponse {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    message: string;

    constructor() {
        //
    }

    public handleError(error: any) {
        this.success = false;

        this.message = error.message;
    }
}