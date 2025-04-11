import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  SignUpDTO } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';




@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}


  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signup(@Body() signUpDto: SignUpDTO) {
    return this.usersService.create(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }



}
