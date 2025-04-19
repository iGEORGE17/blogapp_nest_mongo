import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('MONGODB_URI'),
        onConnectionCreate: (connection: Connection) => {
          // Register event listeners here
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
      UsersModule,
      AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
