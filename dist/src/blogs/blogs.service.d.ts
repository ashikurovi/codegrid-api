import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
export declare class BlogsService {
    private readonly blogRepository;
    constructor(blogRepository: Repository<Blog>);
    create(createBlogDto: CreateBlogDto): Promise<Blog>;
    findAll(): Promise<Blog[]>;
    findOne(id: number): Promise<Blog>;
    update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog>;
    remove(id: number): Promise<void>;
}
