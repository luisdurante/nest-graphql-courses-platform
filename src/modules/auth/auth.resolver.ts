import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResponse } from './dto/login-response.dto';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UserDTO } from '../../modules/users/dto/user.dto';
import { CreateUserInput } from '../../modules/users/dto/create-user.input';

@Resolver()
export default class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginInput') loginInput: LoginInput, @Context() context) {
    try {
      return this.authService.login(context.user);
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => UserDTO)
  signup(@Args('signupInput') signupInput: CreateUserInput) {
    try {
      return this.authService.signup(signupInput);
    } catch (err) {
      return err;
    }
  }
}
