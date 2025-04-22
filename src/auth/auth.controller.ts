import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpCode, HttpStatus, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  SignUpDTO } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Console } from 'console';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Types } from 'mongoose';




@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}


  @Post('signup')
  // @UseGuards(LocalAuthGuard)
  async signup(@Body() signUpDto: SignUpDTO) {
    return this.authService.registerUser(signUpDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return req.user;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return req.user;
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { userId: Types.ObjectId; refreshToken: string }) {
    const { userId, refreshToken } = body;

    try {
      const newAccessToken = await this.authService.refreshToken(
        userId,
        refreshToken,
      );
      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }


  // @UseGuards(LocalAuthGuard)
  // @Post('logout')
  // async logout(@Request() req) {
  //   return req.logout();
  // }
  



}
