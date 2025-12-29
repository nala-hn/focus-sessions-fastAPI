import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { OAuth2PasswordRequestFormDto } from './dto/oauth2-password-request-form.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.username, dto.email, dto.password);
  }

  @Post('token')
  @ApiBody({
    type: OAuth2PasswordRequestFormDto,
    description: 'Login menggunakan application/x-www-form-urlencoded (seperti FastAPI OAuth2PasswordRequestForm)',
  })
  login(@Body() body: OAuth2PasswordRequestFormDto) {
    return this.authService.login(body.username, body.password);
  }
}
