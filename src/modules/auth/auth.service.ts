import { Injectable } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';
import { User } from '../../modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../../modules/users/dto/create-user.input';
import { hash, compare } from 'bcrypt';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    const validPassword: boolean = await compare(password, user.password);

    if (user && validPassword) {
      const { password, ...validatedUser } = user;
      return validatedUser;
    }

    return null;
  }

  login(user: User): LoginResponse {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async signup(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = await hash(createUserInput.password, 10);
    return this.usersService.create(createUserInput);
  }
}
