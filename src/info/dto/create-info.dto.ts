import { IsString } from "class-validator"

export class CreateInfoDto {
    @IsString()
    username: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsString()
    address: string

    @IsString()
    country: string
}
