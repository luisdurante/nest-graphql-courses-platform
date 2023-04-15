import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDTO } from './dto/user.dto';
import { ForbiddenException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/gql-jwt-auth.guard';

@Resolver(() => UserDTO)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserDTO], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (err) {
      return err;
    }
  }

  @Query(() => UserDTO, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => UserDTO)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context() context: any,
  ) {
    try {
      const authUserId = context.req.user.id;

      if (authUserId !== updateUserInput.id) {
        throw new ForbiddenException(`Forbidden Action`);
      }

      return this.usersService.update(updateUserInput);
    } catch (err) {
      return err;
    }
  }

  @Mutation(() => UserDTO)
  @UseGuards(JwtAuthGuard)
  removeUser(
    @Args('id', { type: () => String }) id: string,
    @Context() context: any,
  ) {
    try {
      const authUserId = context.req.user.id;

      if (authUserId !== id) {
        throw new ForbiddenException(`Forbidden Action`);
      }

      return this.usersService.remove(id);
    } catch (err) {
      return err;
    }
  }
}
