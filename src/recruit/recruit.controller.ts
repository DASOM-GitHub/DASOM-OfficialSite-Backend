import { Body, Controller, Post } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { ApplyDto } from "./dto/apply.dto";

@Controller('recruit')
export class RecruitController {
  constructor(private recruitService: RecruitService) {}

  @Post()
  apply(@Body() applyDto: ApplyDto): ApplyDto {
    return this.recruitService.apply(applyDto);
  }

}
