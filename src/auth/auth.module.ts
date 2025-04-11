import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: User.name, schema: UserSchema }
      ]),
      JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET!,
        signOptions: { expiresIn: '60s' },
      }),
    ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
  
})
export class AuthModule {}
