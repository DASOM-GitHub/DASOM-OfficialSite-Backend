import { Injectable } from '@nestjs/common';
import { ApplyDto } from "./dto/apply.dto";

@Injectable()
export class RecruitService {

  apply(applyDto: ApplyDto): ApplyDto {
    console.log(applyDto);
    return applyDto;
  }

}
