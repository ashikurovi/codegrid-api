import { HttpStatus } from '@nestjs/common';
import { CostingService } from './costing.service';
import { CreateCostingDto } from './dto/create-costing.dto';
import { UpdateCostingDto } from './dto/update-costing.dto';
export declare class CostingController {
    private readonly costingService;
    constructor(costingService: CostingService);
    create(dto: CreateCostingDto): Promise<import("./entities/costing.entity").Costing>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/costing.entity").Costing[];
    }>;
    getSummary(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            totalCost: number;
            recordsCount: number;
            records: import("./entities/costing.entity").Costing[];
        };
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/costing.entity").Costing;
    }>;
    update(id: string, dto: UpdateCostingDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/costing.entity").Costing;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
