import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async save(arg0: { password: any; email: string; }) {
        return this.userModel.create(arg0);
    }
    
    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async accept(email: string) {
        return this.userModel.findOneAndUpdate({ email }, { isAccountActive: true }).exec();
    }
}
