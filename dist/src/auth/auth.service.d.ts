import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(loginDto: LoginDto): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
}
