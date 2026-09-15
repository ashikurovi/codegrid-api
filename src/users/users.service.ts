import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: { id: true, name: true, email: true, phone: true, deliveryaddress: true, division: true, city: true, role: true, picture: true, isBanned: true }
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id },
      select: { id: true, name: true, email: true, phone: true, deliveryaddress: true, division: true, city: true, role: true, picture: true, isBanned: true }
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ 
      where: { email },
      select: { id: true, name: true, email: true, password: true, phone: true, deliveryaddress: true, division: true, city: true, role: true, picture: true, isBanned: true } // Password might be needed for auth checks here
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      const saltOrRounds = 10;
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
    }

    const updatedUser = this.userRepository.merge(user, updateUserDto);

    try {
      return await this.userRepository.save(updatedUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async banUser(id: number, isBanned: boolean): Promise<User> {
    const user = await this.findOne(id);
    user.isBanned = isBanned;
    return await this.userRepository.save(user);
  }
}

