import { Test, TestingModule } from '@nestjs/testing';
import { RecruitController } from './recruit.controller';

describe('RecruitController', () => {
  let controller: RecruitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecruitController],
    }).compile();

    controller = module.get<RecruitController>(RecruitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
