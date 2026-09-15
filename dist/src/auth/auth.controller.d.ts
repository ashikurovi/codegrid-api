import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            access_token: string;
            user: any;
        };
    }>;
    getProfile(req: any): {
        statusCode: HttpStatus;
        message: string;
        data: any;
    };
}
