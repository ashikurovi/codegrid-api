import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = this.blogRepository.create(createBlogDto);
    return await this.blogRepository.save(blog);
  }

  async findAll(): Promise<Blog[]> {
    return await this.blogRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(identifier: string | number): Promise<Blog> {
    const isNum = !isNaN(Number(identifier)) && /^\d+$/.test(String(identifier).trim());
    let blog: Blog | null = null;

    if (isNum) {
      blog = await this.blogRepository.findOne({ where: { id: Number(identifier) } });
    }

    if (!blog) {
      const term = String(identifier).trim().toLowerCase();
      const allBlogs = await this.findAll();
      blog = allBlogs.find((b) => {
        const bSlug = (b.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return bSlug === term || String(b.id) === term;
      }) || null;
    }

    if (!blog) {
      throw new NotFoundException(`Blog with ID/Slug '${identifier}' not found`);
    }
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);
    Object.assign(blog, updateBlogDto);
    return await this.blogRepository.save(blog);
  }

  async remove(id: number): Promise<void> {
    const blog = await this.findOne(id);
    await this.blogRepository.remove(blog);
  }
}
