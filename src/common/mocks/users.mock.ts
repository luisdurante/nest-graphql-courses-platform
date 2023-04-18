import { randomUUID } from 'crypto';
import { CreateUserInput } from 'src/modules/users/dto/create-user.input';
import { User } from 'src/modules/users/entities/user.entity';

export class UsersMock {
  static readonly users: User[] = [
    {
      id: randomUUID(),
      name: 'Fulano da Silva',
      description: null,
      email: 'fulano@email.com',
      password: 'password',
      birthDate: new Date(2000, 3, 14, 0, 0, 0),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: randomUUID(),
      name: 'Ciclano da Silva',
      description: null,
      email: 'ciclano@email.com',
      password: 'password',
      birthDate: new Date(1962, 11, 6, 0, 0, 0),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      id: randomUUID(),
      name: 'Beltrano da Silva',
      description: 'Valid Description',
      email: 'beltrano@email.com',
      password: 'password',
      birthDate: new Date(2003, 8, 9, 0, 0, 0),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ];

  static getValidUsers(): User[] {
    return this.users;
  }

  static getValidUser(): User {
    return this.users[0];
  }

  static getUserInput(): CreateUserInput {
    return {
      email: 'fulano@email.com',
      name: 'Fulano da Silva',
      password: 'password',
      birthDate: new Date(2000, 3, 14, 0, 0, 0),
    };
  }

  static getCreatedUser(): User {
    return this.users[0];
  }
}
