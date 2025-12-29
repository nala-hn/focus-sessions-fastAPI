import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(data: UserCreateDto): Promise<UserResponseDto> {
    const exists = await this.userRepo.findOneBy({ email: data.email });
    if (exists) throw new ConflictException('Email already registered');
    const user = this.userRepo.create({
      username: data.username,
      email: data.email,
      password: await bcrypt.hash(data.password, 10),
    });
    await this.userRepo.save(user);
    return { id: user.id, username: user.username, email: user.email };
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepo.findOneBy({ username });
    return user === null ? undefined : user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOneBy({ email });
    return user === null ? undefined : user;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user) return null;
    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : null;
  }
}
