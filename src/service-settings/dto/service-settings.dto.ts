import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { SettingsEnum } from "./settings.enum";

export class ServiceSettingsDto {
    @IsEnum(SettingsEnum)
    @IsString()
    @Length(4, 20)
    key: SettingsEnum;

    @IsString()
    value: string;

    @IsOptional()
    @IsString()
    description?: string;
}
