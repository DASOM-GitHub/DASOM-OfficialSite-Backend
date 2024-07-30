import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}
    
    @Post()
    create(@Body() createFormDto: CreateFormDto) {
        return this.formService.create(createFormDto);
    }

    @Get()
    findAll() {
        return this.formService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.formService.findOne(id);
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFormDto: CreateFormDto) {
        return this.formService.update(id, updateFormDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.formService.remove(id);
    }
}
