import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/users/schemas/users.schema';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { generate } from 'rxjs';

export interface AuthenticatedUser {
  user: User;
  access_token: string;
}


@Injectable()
export class AuthService {
  
  constructor(@InjectModel(User.name) private userModel: Model<User>,
              private readonly jwtService: JwtService, // Inject the JwtService
) {}
  /**
   * Creates a new user in the database.
   * @param signUpDto - The data transfer object containing user sign-up information.
   * @returns The created user.
   */
  

  async registerUser(signUpDto: SignUpDTO): Promise<User> {
    const createdUser = new this.userModel(signUpDto);
    console.log('createdUser', createdUser);
    return createdUser.save();
  }
 

  /**
   * Authenticates a user based on the provided login credentials.
  async validateUser(loginDto: LoginDTO): Promise<AuthenticatedUser | null> {
   * @returns The authenticated user or null if authentication fails.
   * @throws UnauthorizedException if the user is not found or credentials are invalid.
   */

  async validateUser(loginDto: LoginDTO): Promise<AuthenticatedUser | null> {
    const user = await this.userModel.findOne({ email: loginDto.email }).exec();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await user.comparePassword(loginDto.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user,
      access_token: await this.generateToken(user._id),
    }
    
  }

async generateToken(userId: Types.ObjectId) {    
  const access_token = this.jwtService.signAsync({ userId }, { 
    secret: process.env.JWT_SECRET,
    expiresIn: '60s' });
  return access_token   
} 


}
