import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UserService,
      ) {}

    async register(body: LoginDto) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        return this.usersService.save({ ...body, password: hashedPassword });
    }

      async login(user: any) {
        const payload = { email: user.email }; 
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN;
    
        return {
          access_token: jwt.sign(payload, secret, { expiresIn }),
        };
      }


      async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user;
          return result;
        }
        return null;
      }
}
