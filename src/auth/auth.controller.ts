import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    async register(@Body() body: LoginDto) {
      return this.authService.register(body);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req) {
      return this.authService.login(req.user);
    }

}
