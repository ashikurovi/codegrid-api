import { HttpStatus } from '@nestjs/common';
import { FlashsellService } from './flashsell.service';
import { CreateFlashsellDto } from './dto/create-flashsell.dto';
import { UpdateFlashsellDto } from './dto/update-flashsell.dto';
export declare class FlashsellController {
    private readonly flashsellService;
    private readonly IMGBB_API_KEY;
    constructor(flashsellService: FlashsellService);
    private uploadToImgbb;
    create(createFlashsellDto: CreateFlashsellDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/flashsell.entity").Flashsell;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/flashsell.entity").Flashsell[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/flashsell.entity").Flashsell;
    }>;
    update(id: string, updateFlashsellDto: UpdateFlashsellDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/flashsell.entity").Flashsell;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
