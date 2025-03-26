import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, SignupDto } from './auth_dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import {HashingFunctions} from "./hashingFunctions";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: SignupDto): Promise<{ success: boolean }> {
        try {
            const existingUser = await this.prisma.users.findUnique({
                where: { email: dto.email },
            });

            if (existingUser) {
                throw new ForbiddenException('Email already in use');
            }

            const hashedPassword = await HashingFunctions.hashPassword(dto.password);

            await this.prisma.users.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    fullName: dto.FullName,
                },
            });

            return { success: true };
        } catch (error) {
            throw error;
        }
    }

    async signin(dto: LoginDto): Promise<{ success: boolean }> {
        try {
            const user = await this.prisma.users.findUnique({
                where: { email: dto.email },
            });

            if (!user || !(await HashingFunctions.comparePassword(dto.password, user.password))) {
                throw new UnauthorizedException('Invalid email or password');
            }

            return { success: true };
        } catch (error) {
            throw error;
        }
    }
}
