import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { ApplyDto } from "./dto/apply.dto";
import { Recruit } from "./recruit.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RecruitService {
  constructor(@InjectModel(Recruit.name) private recruitModel: Model<Recruit>) {}

  // apply : 신규 지원자 등록
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

  // findAll : 모든 지원자 조회


  // findOne : id를 기준으로 특정 지원자 조회


  // update : id를 기준으로 특정 지원자 수정


  // remove : id를 기준으로 특정 지원자 삭제


}
