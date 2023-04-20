import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersMock } from '../../common/test/users-mocks';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    preload: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  beforeEach(async () => {
    for (const key in mockUserRepository) {
      mockUserRepository[key].mockReset();
    }
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      // Arrange
      mockUserRepository.find.mockReturnValue(UsersMock.getValidUsers());

      // Act
      const users = await usersService.findAll();

      // Assert
      expect(users).toHaveLength(UsersMock.getUsersLength());
      expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    it('should return an existing user', async () => {
      // Arrange
      const mockUser = UsersMock.getValidUser();
      mockUserRepository.findOne.mockReturnValue(mockUser);

      // Act
      const user = await usersService.findOneById(mockUser.id);

      // Assert
      expect(user).toMatchObject(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException when user does not exist', async () => {
      // Arrange
      mockUserRepository.findOne.mockReturnValue(null);

      // Act, Assert
      await expect(
        usersService.findOneById(UsersMock.getInvalidId()),
      ).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneByEmail', () => {
    it('should return an existing user', async () => {
      // Arrange
      const mockUser = UsersMock.getValidUser();
      mockUserRepository.findOne.mockReturnValue(mockUser);

      // Act
      const user = await usersService.findOneByEmail(mockUser.email);

      // Assert
      expect(user).toMatchObject(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException when user does not exist', async () => {
      // Arrange
      mockUserRepository.findOne.mockReturnValue(null);

      // Act, Assert
      await expect(
        usersService.findOneByEmail(UsersMock.getInvalidEmail()),
      ).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create and return an user', async () => {
      // Arrange
      const mockUser = UsersMock.getCreateUserInput();
      mockUserRepository.create.mockReturnValue(mockUser);
      mockUserRepository.save.mockReturnValue(UsersMock.getCreatedUser());

      // Act
      const user = await usersService.create(mockUser);

      // Assert
      expect(user).toMatchObject(mockUser);
      expect(mockUserRepository.create).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update and return an existing user', async () => {
      // Arrange
      const mockUser = UsersMock.getValidUser();
      const updatedUserInput = { id: mockUser.id, name: 'Updated Name' };
      const userResponse = { ...mockUser, name: 'Updated Name' };
      mockUserRepository.preload.mockReturnValue(userResponse);
      mockUserRepository.save.mockReturnValue(userResponse);

      // Act
      const user = await usersService.update(updatedUserInput);

      // Assert
      expect(user).toMatchObject(userResponse);
      expect(mockUserRepository.preload).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException when user does not exist', async () => {
      // Arrange
      const updatedUserInput = {
        id: UsersMock.getInvalidId(),
        name: 'Updated Name',
      };
      mockUserRepository.preload.mockReturnValue(null);

      // Act, Assert
      await expect(usersService.update(updatedUserInput)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.preload).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.save).toHaveBeenCalledTimes(0);
    });
  });

  describe('remove', () => {
    it('should remove and return the removed user', async () => {
      // Arrange
      const mockUser = UsersMock.getValidUser();
      mockUserRepository.findOne.mockReturnValue(mockUser);
      mockUserRepository.remove.mockReturnValue(mockUser);

      // Act
      const user = await usersService.remove(mockUser.id);

      // Assert
      expect(user).toMatchObject(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.remove).toHaveBeenCalledTimes(1);
    });

    it('should return NotFoundException when user does not exist', async () => {
      // Arrange
      mockUserRepository.findOne.mockReturnValue(null);

      // Act, Assert
      await expect(
        usersService.remove(UsersMock.getInvalidId()),
      ).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.remove).toHaveBeenCalledTimes(0);
    });
  });
});
