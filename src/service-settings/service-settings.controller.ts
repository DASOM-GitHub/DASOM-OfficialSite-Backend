import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ServiceSettingsService } from "./service-settings.service";
import { ServiceSettingsDto } from "./dto/service-settings.dto";
import { ServiceSettings } from "./schema/service-settings.schema";
import { LocalAuthGuard } from "../auth/local/local.guard";

@Controller('api/service')
export class ServiceSettingsController {
  constructor(private serviceSettingsService: ServiceSettingsService) {}

  // configureSetting : 설정 추가
  @UseGuards(LocalAuthGuard)
  @Post()
  configureSetting(@Body() recruitSettingsDto: ServiceSettingsDto): Promise<ServiceSettings> {
    return this.serviceSettingsService.configureSetting(recruitSettingsDto);
  }

  // findAll : 모든 설정 조회
  @UseGuards(LocalAuthGuard)
  @Get()
  findAll(): Promise<ServiceSettings[]> {
    return this.serviceSettingsService.findAll();
  }

  // findByKey : 특정 설정 조회
  @UseGuards(LocalAuthGuard)
  @Get(':key')
  findByKey(@Param('key') key: string): Promise<ServiceSettings> {
    return this.serviceSettingsService.findByKey(key);
  }

  // updateSetting : 특정 설정 수정
  @UseGuards(LocalAuthGuard)
  @Patch(':key')
  updateSetting(@Param('key') key: string,
                @Body() updateDto: ServiceSettingsDto)
    : Promise<ServiceSettings> {
    return this.serviceSettingsService.updateSetting(key, updateDto);
  }

  // removeSetting : 특정 설정 삭제
  @UseGuards(LocalAuthGuard)
  @Delete(':key')
  removeSetting(@Param('key') key: string): Promise<object> {
    return this.serviceSettingsService.removeSetting(key);
  }
}
