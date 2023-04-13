import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { DatabaseProvidersConstants } from 'src/constants';
import { randomUUID } from 'crypto';
import { UserDTO } from './dto/user.dto';
import { GraphQLError } from 'graphql';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DatabaseProvidersConstants.USERS)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create({ ...createUserInput });
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      order: { id: 'ASC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const course = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) throw new GraphQLError(`User id doesn't exist`);

    return course;
  }

  async update(updateUserInput: UpdateUserInput) {
    const user = await this.usersRepository.preload({
      id: updateUserInput.id,
      ...updateUserInput,
    });

    if (!user) throw new GraphQLError(`User id doesn't exist`);

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw new GraphQLError(`User id doesn't exist`);

    return this.usersRepository.remove(user);
  }
}
