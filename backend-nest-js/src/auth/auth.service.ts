import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async register(username: string, email: string, password: string) {
        const existing = await this.userRepo.findOne({ where: { email } });
        if (existing) {
            throw new BadRequestException('Email already registered');
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = this.userRepo.create({
            username,
            email,
            password: hashed,
            isActive: true,
        });

        await this.userRepo.save(user);

        return { id: user.id, username: user.username, email: user.email };
    }

    async login(email: string, password: string) {
        const user = await this.userRepo.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            token_type: 'bearer',
        };
    }
}
