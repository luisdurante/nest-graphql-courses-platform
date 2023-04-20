import * as dotenv from 'dotenv';
dotenv.config();

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { AuthService } from '../../modules/auth/auth.service';
import { UsersService } from '../../modules/users/users.service';
import { UsersMock } from './users-mocks';
import { CreateUserInput } from '../../modules/users/dto/create-user.input';
import { User } from '../../modules/users/entities/user.entity';
import { LoginInput } from '../../modules/auth/dto/login.input';

export class IntegrationTestUtils {
  private app: INestApplication;
  private usersService: UsersService;
  private authService: AuthService;

  private createUserInput: CreateUserInput = UsersMock.getCreateUserInput();
  private testUser: User;
  private testUserAccessToken: string;

  public httpServer: any;

  async beforeAll(): Promise<any> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = moduleFixture.createNestApplication();

    await this.app.init();
    this.httpServer = this.app.getHttpServer();
    this.authService = this.app.get<AuthService>(AuthService);
    this.usersService = this.app.get<UsersService>(UsersService);

    this.testUser = await this.authService.signup(this.createUserInput);
    this.createUserInput.password = UsersMock.getCreateUserInput().password;

    this.testUserAccessToken = this.authService.login(
      this.testUser,
    ).access_token;
  }

  async afterAll(): Promise<any> {
    await this.usersService.remove(this.testUser.id);
    await this.app.close();
  }

  getAccessToken() {
    return this.testUserAccessToken;
  }

  getLoginInput(): LoginInput {
    return {
      email: this.createUserInput.email,
      password: this.createUserInput.password,
    };
  }

  async removeTestUser(id: string): Promise<void> {
    await this.usersService.remove(id);
  }
}
