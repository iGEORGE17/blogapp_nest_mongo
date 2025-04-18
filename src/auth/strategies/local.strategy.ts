
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    , // Use 'email' as the username field
      passwordField: 'password' // Use 'password' as the password field
    });
  }

  async validate(email, password): Promise<any> {
    const user = await this.authService.validateUser({email, password});
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
