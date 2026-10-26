import {  Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/shared/database/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/ports/user.repository';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<User[]> {
    const row = await this.prisma.user.findAll();
    return row;
  }
  async findByEmail(email: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { email } });
    return row ? this.toDomain(row) : null;
  }
  async create(user: User): Promise<User> {
    const row = await this.prisma.user.create(user);
    return row;
  }
  async update(user: User): Promise<User> {
    const userExists = await this.findById(user.id);
    if (!userExists) throw new NotFoundException('User not found');

    const userUpdated = await this.prisma.user.update({
      where: { user },
      user,
    });
    return userUpdated;
  }
  async delete(id: string): Promise<void> {
    const userExists = await this.findById(id);
    if (!userExists) throw new NotFoundException('User not found');

    return this.prisma.user.delete({ where: { id } });
  }

  async findById(id: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: any): User {
    return User.create({
      id: row.id,
      email: row.email,
      name: row.name,
      passwordHash: row.password, // ← el mapeo vive aquí, no en el caso de uso
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    });
  }
}
