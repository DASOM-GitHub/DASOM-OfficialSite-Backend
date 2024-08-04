import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ServiceSettings } from "./schema/service-settings.schema";
import { Model } from "mongoose";
import { ServiceSettingsDto } from "./dto/service-settings.dto";
import * as moment from 'moment-timezone';

@Injectable()
export class ServiceSettingsService {
  constructor(@InjectModel(ServiceSettings.name) private serviceSettingsModel: Model<ServiceSettings>) {}

  // configureSetting : 설정 추가
  async configureSetting(settingData: ServiceSettingsDto): Promise<ServiceSettings> {
    const setting = new this.serviceSettingsModel(settingData);
    try {
      return await setting.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Setting Already Exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // findAll : 모든 설정 조회
  async findAll(): Promise<ServiceSettings[]> {
    const settings = await this.serviceSettingsModel.find().exec();
    settings.forEach((setting) => {
      setting.value = this.convertUtcDateToKst(setting.value);
    })
    return settings;
  }

  // findByKey : 특정 설정 조회
  async findByKey(key: string): Promise<ServiceSettings> {
    const setting = await this.serviceSettingsModel.findOne({ key }).exec();
    if (!setting) throw new NotFoundException('Setting Not Found');
    setting.value = this.convertUtcDateToKst(setting.value);
    return setting;
  }

  // updateSetting : 특정 설정 수정
  async updateSetting(key: string, updateDto: ServiceSettingsDto): Promise<ServiceSettings> {
    const setting = await this.serviceSettingsModel.findOneAndUpdate(
      { key }, updateDto, { new: true, runValidators: true }
    ).exec();
    if (!setting) throw new NotFoundException('Setting Not Found');
    return setting;
  }

  // removeSetting : 특정 설정 삭제
  async removeSetting(key: string): Promise<object> {
    const setting = await this.serviceSettingsModel.findOneAndDelete({ key }).exec();
    if (!setting) throw new NotFoundException('Setting Not Found');
    return { key };
  }


  // convertUtcDateToKst : UTC 시간을 한국 시간으로 변환
  convertUtcDateToKst(date: string): string {
    return moment(date, moment.ISO_8601).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
  }
}
