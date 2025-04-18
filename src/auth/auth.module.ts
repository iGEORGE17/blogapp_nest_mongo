import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
    imports: [
      UsersModule,
      PassportModule,
      MongooseModule.forFeature([
        { name: User.name, schema: UserSchema }
      ]),
      JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' },
      }),
    ],
  controllers: [AuthController],
  providers: [AuthService, UsersService,  LocalStrategy, JwtAuthGuard, JwtStrategy],
  exports: [JwtAuthGuard]
  
})
export class AuthModule {}
