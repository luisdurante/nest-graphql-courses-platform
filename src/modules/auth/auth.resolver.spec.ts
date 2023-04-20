import { Test, TestingModule } from '@nestjs/testing';
import AuthResolver from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersMock } from '../../common/test/users-mocks';

describe('AuthResolver', () => {
  let authResolver: AuthResolver;
  let authService: AuthService;

  const authServiceMock = {
    signup: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    authResolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authResolver).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return a valid user with their access token', async () => {
      // Arrange
      const loginMock = {
        access_token: UsersMock.getAccessToken(),
        user: UsersMock.getValidUser(),
      };
      const loginInput = {
        email: loginMock.user.email,
        password: loginMock.user.email,
      };
      jest.spyOn(authService, 'login').mockReturnValue(loginMock);

      // Act
      const login = authResolver.login(loginInput, loginMock.user);

      // Assert
      expect(login).toMatchObject(loginMock);
      expect(authService.login).toBeCalledTimes(1);
    });
  });

  describe('login', () => {
    it('should return a created user', async () => {
      // Arrange
      const userMock = UsersMock.getValidUser();
      const createUserInput = {
        email: userMock.email,
        name: userMock.name,
        birthDate: userMock.birthDate,
        password: userMock.email,
      };

      authServiceMock.signup.mockReturnValue(userMock);

      // Act
      const user = authResolver.signup(createUserInput);

      // Assert
      expect(user).toMatchObject(userMock);
      expect(authService.signup).toBeCalledTimes(1);
    });
  });
});
