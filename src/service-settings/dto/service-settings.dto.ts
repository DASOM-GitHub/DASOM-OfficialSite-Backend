import { IsOptional, IsString, Length } from "class-validator";

export class ServiceSettingsDto {
    @IsString()
    @Length(4, 20)
    key: string;

    @IsString()
    value: string;

    @IsOptional()
    @IsString()
    description?: string;
}
