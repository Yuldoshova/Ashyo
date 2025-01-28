import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh.dto';
import { LoginDto } from './dto/login.dto';
import { CheckOtpDto } from './dto/check-otp.dto';

@ApiTags('Auth')
@Controller({ version: "1", path: "auth" })
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(
    @Body() payload: LoginDto
  ) {
    return await this.authService.login(payload);
  }

  @Post('/check-otp')
  async checkotp(
    @Body() payload: CheckOtpDto
  ) {
    return await this.authService.checkOtp(payload);
  }

  @Post('/refresh')
  async refresh(
    @Body() payload: RefreshDto
  ) {
    return await this.authService.refresh(payload);
  }
}
