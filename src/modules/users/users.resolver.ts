import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { ReturningStatementNotSupportedError } from 'typeorm';

@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserDTO)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    try {
      return await this.usersService.create(createUserInput);
    } catch (err) {
      return err;
    }
  }

  @Query(() => [UserDTO], { name: 'users' })
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (err) {
      return err;
    }
  }

  @Query(() => UserDTO, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => UserDTO)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    try {
      return this.usersService.update(updateUserInput);
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => UserDTO)
  removeUser(@Args('id', { type: () => String }) id: string) {
    try {
      return this.usersService.remove(id);
    } catch (err) {
      return err;
    }
  }
}
