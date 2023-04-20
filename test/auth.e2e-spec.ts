import request from 'supertest-graphql';
import gql from 'graphql-tag';
import { IntegrationTestUtils } from '../src/common/test/integration-test-utils';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersMock } from '../src/common/test/users-mocks';
import { LoginResponse } from '../src/modules/auth/dto/login-response.dto';

const integrationTestUtil: IntegrationTestUtils = new IntegrationTestUtils();

describe('Users', () => {
  beforeAll(async () => {
    await integrationTestUtil.beforeAll();
  });

  afterAll(async () => {
    await integrationTestUtil.afterAll();
  });

  describe('Signup', () => {
    it('should create a new user', async () => {
      // Arrange
      const signupInput = UsersMock.getFormattedCreateUserInput();

      // Act
      const response = await request<{ signup: User }>(
        integrationTestUtil.httpServer,
      )
        .mutate(
          gql`
            mutation signup($signupInput: CreateUserInput!) {
              signup(signupInput: $signupInput) {
                id
                birthDate
                name
                email
              }
            }
          `,
        )
        .variables({ signupInput })
        .expectNoErrors();

      // Assert

      expect(response.data.signup).toMatchObject({
        email: signupInput.email,
        name: signupInput.name,
        birthDate: signupInput.birthDate,
      });

      integrationTestUtil.removeTestUser(response.data.signup.id);
    });
  });

  describe('Login', () => {
    it('should return a successful login', async () => {
      // Arrange
      const loginInput = integrationTestUtil.getLoginInput();

      // Act
      const response = await request<{ login: LoginResponse }>(
        integrationTestUtil.httpServer,
      )
        .mutate(
          gql`
            mutation login($loginInput: LoginInput!) {
              login(loginInput: $loginInput) {
                access_token
                user {
                  email
                }
              }
            }
          `,
        )
        .variables({ loginInput })
        .expectNoErrors();

      // Assert
      expect(response.data.login.access_token).toBeDefined();
      expect(response.data.login.user).toBeDefined();
      expect(response.data.login.user.email).toBe(loginInput.email);
    });
  });
});
