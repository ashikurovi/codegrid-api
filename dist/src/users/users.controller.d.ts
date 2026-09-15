import { HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly IMGBB_API_KEY;
    constructor(usersService: UsersService);
    private uploadToImgbb;
    create(createUserDto: CreateUserDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/user.entity").User[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    banUser(id: string, isBanned: boolean): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
}
