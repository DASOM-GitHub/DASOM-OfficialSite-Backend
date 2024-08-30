import { Body, Controller, HttpCode, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local/local.guard';
import { JwtAuthGuard } from "./jwt/jwt.guard";
import { RolesGuard } from "./role/roles.guard";
import { Roles } from "src/user/schema/user.role.decorator";
import { Role } from "src/user/schema/user.role";

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    async register(@Body() body: LoginDto) {
      return this.authService.register(body);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Req() req) {
      return this.authService.login(req.user);
    }

    @Patch('accept')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.SUPERADMIN)
    async accept(@Body('email') email: string) {
      return this.authService.accept(email);
    }

}
