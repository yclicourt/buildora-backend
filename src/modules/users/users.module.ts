import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/users.controller';
import { CreateUserUseCase } from './application/uses-cases/create-user.use-case';
import { DeleteUserUseCase } from './application/uses-cases/delete-user.use-case';
import { GetUserUseCase } from './application/uses-cases/get-user.use-case';
import { ListUsersUseCase } from './application/uses-cases/list-users.use-case';
import { UpdateUserUseCase } from './application/uses-cases/update-user.use-case';

@Module({
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UsersModule {}
