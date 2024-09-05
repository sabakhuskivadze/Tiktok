import { IsString } from "class-validator";

export class CreatePriavteipDto {
    @IsString()
    address:string
}
