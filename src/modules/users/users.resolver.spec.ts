import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersMock } from '../../common/mocks/users.mock';
import { ForbiddenException } from '@nestjs/common';
import { User } from './entities/user.entity';

describe('UsersResolver', () => {
  let usersResolver: UsersResolver;
  let usersService: UsersService;

  const usersServiceMock = {
    findAll: jest.fn(),
    findOneById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: usersServiceMock,
        },
      ],
    }).compile();

    usersResolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  beforeEach(async () => {
    for (const key in usersServiceMock) {
      usersServiceMock[key].mockReset();
    }
  });

  it('should be defined', () => {
    expect(usersResolver).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      // Arrange
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => UsersMock.getValidUsers());

      // Act
      const users = await usersResolver.findAll();

      // Assert
      expect(users).toHaveLength(UsersMock.getUsersLength());
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a valid user', async () => {
      // Arrange
      const mockUser = UsersMock.getValidUser();
      jest
        .spyOn(usersService, 'findOneById')
        .mockImplementation(async () => mockUser);

      // Act
      const user = await usersResolver.findOne(mockUser.id);

      // Assert
      expect(user).toMatchObject(mockUser);
      expect(usersService.findOneById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should return an updated user', async () => {
      // Arrange
      const userMock = UsersMock.getValidUser();
      const updateUserInput = { id: userMock.id, name: 'Updated User' };
      const updatedUserMock = { ...userMock, name: 'Updated User' };
      const context = UsersMock.getValidContext();
      jest
        .spyOn(usersService, 'update')
        .mockImplementation(async () => updatedUserMock);

      // Act
      const user = await usersResolver.updateUser(updateUserInput, context);

      // Assert
      expect(user).toMatchObject(updatedUserMock);
      expect(usersService.update).toHaveBeenCalledTimes(1);
    });

    it(`should return ForbiddenException when user tokens don't match`, async () => {
      // Arrange
      const userMock = UsersMock.getValidUser();
      const updateUserInput = { id: userMock.id, name: 'Updated User' };
      const context = UsersMock.getInvalidContext();

      // Act, Assert
      await expect(
        async () => await usersResolver.updateUser(updateUserInput, context),
      ).rejects.toThrow(ForbiddenException);
      expect(usersService.update).toHaveBeenCalledTimes(0);
    });
  });

  describe('updateUser', () => {
    it('should return an removed user', async () => {
      // Arrange
      const userMock = UsersMock.getValidUser();
      const context = UsersMock.getValidContext();
      jest
        .spyOn(usersService, 'remove')
        .mockImplementation(async () => userMock);

      // Act
      const user = await usersResolver.removeUser(userMock.id, context);

      // Assert
      expect(user).toMatchObject(userMock);
      expect(usersService.remove).toHaveBeenCalledTimes(1);
    });

    it(`should return ForbiddenException when user tokens don't match`, async () => {
      // Arrange
      const userMock = UsersMock.getValidUser();
      const context = UsersMock.getInvalidContext();

      // Act, Assert
      await expect(
        async () => await usersResolver.removeUser(userMock.id, context),
      ).rejects.toThrow(ForbiddenException);
      expect(usersService.remove).toHaveBeenCalledTimes(0);
    });
  });
});
