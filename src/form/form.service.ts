import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { Form } from './schema/form.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import mongoose from "mongoose";

@Injectable()
export class FormService {
    constructor(@InjectModel(Form.name) private formModel: Model<Form>) {}

    async create(createFormDto: CreateFormDto): Promise<Form> {
        const createdForm = new this.formModel({ data: createFormDto});
        return createdForm.save();
    }

    async findAll(): Promise<Form[]> {
        return await this.formModel.find().exec();
    }

    async findOne(id: string): Promise<Form> {
        const objId = new mongoose.Types.ObjectId(id);
        return await this.formModel.findOne({ _id: objId}).exec();
    } 

}
