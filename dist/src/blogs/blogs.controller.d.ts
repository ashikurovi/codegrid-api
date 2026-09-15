import { HttpStatus } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
export declare class BlogsController {
    private readonly blogsService;
    private readonly IMGBB_API_KEY;
    constructor(blogsService: BlogsService);
    private uploadToImgbb;
    create(createBlogDto: CreateBlogDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/blog.entity").Blog;
    }>;
    findAll(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/blog.entity").Blog[];
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/blog.entity").Blog;
    }>;
    update(id: string, updateBlogDto: UpdateBlogDto, file?: Express.Multer.File): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/blog.entity").Blog;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
