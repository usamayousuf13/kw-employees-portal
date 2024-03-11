/*
  Due to limited time, unit and integration tests are not covered.
*/

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

describe('UsersController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let usersController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('should return "Hello World!"', () => {});
  });
});
