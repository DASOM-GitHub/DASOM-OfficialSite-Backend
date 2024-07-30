import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ApplyDto } from "./dto/apply.dto";
import { Recruit } from "./recruit.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RecruitService {
  constructor(@InjectModel(Recruit.name) private recruitModel: Model<Recruit>) {}

  async apply(applyDto: ApplyDto): Promise<Recruit> {
    const application = new this.recruitModel(applyDto);
    try {
      return await application.save();
    } catch (error) {
      if (error.code === 11000) // 학번 중복 오류 발생 시
        throw new ConflictException('Already applied');
      else
        throw new InternalServerErrorException();
    }
  }

  async findAll(): Promise<Recruit[]> {
    return await this.recruitModel.find().exec();
  }

}
