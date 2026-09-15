import { BlogStatus } from '../entities/blog.entity';
export declare class CreateBlogDto {
    title: string;
    excerpt?: string;
    content: string;
    date?: string;
    image?: string;
    status?: BlogStatus;
}
