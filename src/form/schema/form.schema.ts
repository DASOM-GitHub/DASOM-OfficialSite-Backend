import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'; 
import { Document, Types } from 'mongoose';

export type FormDocument = Form & Document;

@Schema()
export class Form extends Document {
    @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
    _id: Types.ObjectId;

    @Prop({ type: Object, required: true })
    data: Record<string, any>;
}

export const FormSchema = SchemaFactory.createForClass(Form);

