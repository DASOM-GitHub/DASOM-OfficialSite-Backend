import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ServiceSettingsService } from "./service-settings.service";
import { ServiceSettingsDto } from "./dto/service-settings.dto";
import { ServiceSettings } from "./schema/service-settings.schema";
import { JwtAuthGuard } from "../auth/jwt/jwt.guard";
import { ServiceInfo } from "./schema/service-info.schema";
import { ServiceInfoDto } from "./dto/service-info.dto";

@Controller('api/service')
export class ServiceSettingsController {
  constructor(private serviceSettingsService: ServiceSettingsService) {}

  // configureSetting : 설정 추가
  @UseGuards(new JwtAuthGuard())
  @Post()
  configureSetting(@Body() recruitSettingsDto: ServiceSettingsDto): Promise<ServiceSettings> {
    return this.serviceSettingsService.configureSetting(recruitSettingsDto);
  }

  // findAll : 모든 설정 조회
  @UseGuards(new JwtAuthGuard())
  @Get()
  findAll(): Promise<ServiceSettings[]> {
    return this.serviceSettingsService.findAll();
  }

  // findByKey : 특정 설정 조회
  @UseGuards(new JwtAuthGuard())
  @Get(':key')
  findByKey(@Param('key') key: string): Promise<ServiceSettings> {
    return this.serviceSettingsService.findByKey(key);
  }

  // updateSetting : 특정 설정 수정
  @UseGuards(new JwtAuthGuard())
  @Patch(':key')
  updateSetting(@Param('key') key: string,
                @Body() updateDto: ServiceSettingsDto)
    : Promise<ServiceSettings> {
    return this.serviceSettingsService.updateSetting(key, updateDto);
  }

  // removeSetting : 특정 설정 삭제
  @UseGuards(new JwtAuthGuard())
  @Delete(':key')
  removeSetting(@Param('key') key: string): Promise<object> {
    return this.serviceSettingsService.removeSetting(key);
  }

  // getServiceInfo : 서비스 정보 조회
  @UseGuards(new JwtAuthGuard())
  @Get('info')
  getServiceInfo(): Promise<ServiceInfo> {
    return this.serviceSettingsService.getServiceInfo();
  }

  // configureInfo : 서비스 정보 추가
  @UseGuards(new JwtAuthGuard())
  @Post('info')
  configureServiceInfo(@Body() serviceInfoDto: ServiceInfoDto): Promise<ServiceInfo> {
    return this.serviceSettingsService.configureServiceInfo(serviceInfoDto);
  }

  // updateInfo : 서비스 정보 수정
  @UseGuards(new JwtAuthGuard())
  @Patch('info')
  updateServiceInfo(@Body() serviceInfoDto: ServiceInfoDto): Promise<ServiceInfo> {
    return this.serviceSettingsService.updateServiceInfo(serviceInfoDto);
  }
}
