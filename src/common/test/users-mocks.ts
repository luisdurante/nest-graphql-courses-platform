import { CreateUserInput } from '../../modules/users/dto/create-user.input';
import { User } from '../../modules/users/entities/user.entity';

export class UsersMock {
  private static readonly users: User[] = [
    {
      id: '113fad8a-23bc-4e6f-92c2-1705acaec5b9',
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
      id: '585b7c36-d635-4712-8476-28110b23e7c7',
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
      id: '095b1db2-786c-4a8b-ab69-24f14705bf9c',
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

  private static readonly invalidEmail: string = 'fake@email.com';

  private static readonly invalidId: string =
    '0939e8b6-5542-43b5-9087-76d640c3c4f9';

  private static readonly validAccessToken: string = 'valid.access_token.jwt';

  static getValidUsers(): User[] {
    return this.users;
  }

  static getValidUser(): User {
    return this.users[0];
  }

  static getInvalidContext() {
    return {
      req: { user: { id: this.invalidId } },
    };
  }

  static getValidContext() {
    return {
      req: { user: { id: this.users[0].id } },
    };
  }

  static getCreateUserInput(): CreateUserInput {
    return {
      email: this.users[0].email,
      name: this.users[0].name,
      password: this.users[0].password,
      birthDate: this.users[0].birthDate,
    };
  }

  static getFormattedCreateUserInput(): any {
    return {
      email: this.users[1].email,
      name: this.users[1].name,
      password: this.users[1].password,
      birthDate: this.formatDate(this.users[1].birthDate),
    };
  }

  static getInvalidId(): string {
    return this.invalidId;
  }

  static getInvalidEmail(): string {
    return this.invalidEmail;
  }

  static getAccessToken(): string {
    return this.validAccessToken;
  }

  static getCreatedUser(): User {
    return this.users[0];
  }

  static getUsersLength(): number {
    return this.users.length;
  }

  private static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
