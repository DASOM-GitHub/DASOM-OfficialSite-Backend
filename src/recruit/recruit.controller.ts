import { Body, Controller, Get, Post } from "@nestjs/common";
import { RecruitService } from "./recruit.service";
import { ApplyDto } from "./dto/apply.dto";
import { Recruit } from "./recruit.schema";

@Controller('recruit')
export class RecruitController {
  constructor(private recruitService: RecruitService) {}

  @Post()
  apply(@Body() applyDto: ApplyDto): Promise<Recruit> {
    return this.recruitService.apply(applyDto);
  }

  @Get()
  findAll(): Promise<Recruit[]> {
    return this.recruitService.findAll();
  }

}
