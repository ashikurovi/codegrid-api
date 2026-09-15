import { HttpStatus } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
export declare class SizeController {
    private readonly sizeService;
    constructor(sizeService: SizeService);
    create(createSizeDto: CreateSizeDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/size.entity").Size;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/size.entity").Size[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/size.entity").Size;
    }>;
    update(id: string, updateSizeDto: UpdateSizeDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/size.entity").Size;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
