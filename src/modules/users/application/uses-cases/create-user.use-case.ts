import { PrismaService } from '@/shared/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../../domain/ports/user.repository';
import { UserAlreadyExistsException } from '../../domain/exceptions/user.exceptions';
import * as bcryptjs from 'bcryptjs';
import { randomUUID } from 'crypto';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto) {
    const existing = await this.userRepository.findByEmail(createUserDto.email);
    if (existing) {
      throw new UserAlreadyExistsException(createUserDto.email);
    }
    const now = new Date();
    const passwordHash = await bcryptjs.hash(createUserDto.password, 10);
    const user = User.create({
      id: randomUUID(),
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash,
      createdAt: now,
      updatedAt: now,
    });
    const saved = await this.userRepository.create(user);
    return saved;
  }
}
