import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from '../auth/dto/login-dto';
import { UpdateResult } from 'typeorm/browser';
import { UpdateUserProfileDTO } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //ADMIN
  async getAllUserProfile(): Promise<User[]> {
    return this.userRepository.find();
  }

  //USER
  async create(userDTO: CreateUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.userRepository.save(userDTO);
    delete (user as any).password;
    return user;
  }

  async findOne(data: LoginDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if (!user) {
      throw new UnauthorizedException('Can not find user');
    }
    return user;
  }

  async getUserProfile(userId: number): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    if (!user) {
      throw new UnauthorizedException('Can not find user');
    }
    delete (user as any).password;
    return user;
  }

  async updateUserProfile(
    userId: number,
    updateUserProfile: UpdateUserProfileDTO,
  ): Promise<UpdateResult> {
    const salt = await bcrypt.genSalt();
    updateUserProfile.password = await bcrypt.hash(
      updateUserProfile.password,
      salt,
    );
    return this.userRepository.update({ id: userId }, updateUserProfile);
  }
}
