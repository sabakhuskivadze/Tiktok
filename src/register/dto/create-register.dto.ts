import { IsString } from "class-validator"

export class CreateRegisterDto {
    @IsString()
    userInfo:string

    @IsString()
    password:string
}
