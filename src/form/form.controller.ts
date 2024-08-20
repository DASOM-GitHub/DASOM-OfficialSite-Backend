import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    // create : 새로운 Form 생성
    @Post()
    create(@Body() createFormDto: CreateFormDto) {
        return this.formService.create(createFormDto);
    }

    // findAll : 모든 Form 조회

    @Get()
    findAll() {
        return this.formService.findAll();
    }


    // findOne : id를 기준으로 특정 Form 조회

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.formService.findOne(Number(id));
    }


    // update : id를 기준으로 특정 Form 수정

    @Patch('/:id')
    update(@Param('id') id: string, @Body() updateFormDto: CreateFormDto) {
        return this.formService.update(Number(id), updateFormDto);
    }


    // remove : id를 기준으로 특정 Form 삭제

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.formService.remove(Number(id));
    }
    

}
