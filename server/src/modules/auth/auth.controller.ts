import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard, RefreshTokenGuard } from 'src/modules/auth/guards';
import { User } from 'src/common/decorators';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signIn(data);
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  signOut(@User() user: { id: string }) {
    return this.authService.signOut(user.id);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@User() user: { id: string; refreshToken: string }) {
    const { id, refreshToken } = user;
    return this.authService.refreshTokens(id, refreshToken);
  }
}
