import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Role } from "./user.role";


@Schema()
export class User extends Document {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: Role, type: String, default: Role.ADMIN })
    role: Role;

    @Prop({ required: true, type: Boolean, default: false })
    isAccountActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);