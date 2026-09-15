import { HttpStatus } from '@nestjs/common';
import { TypesService } from './types.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
export declare class TypesController {
    private readonly typesService;
    constructor(typesService: TypesService);
    create(createTypeDto: CreateTypeDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/type.entity").Type;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/type.entity").Type[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/type.entity").Type;
    }>;
    update(id: string, updateTypeDto: UpdateTypeDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/type.entity").Type;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
