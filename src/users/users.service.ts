import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from '../auth/dto/login-dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){
    }
    async create(userDTO: CreateUserDTO): Promise<User>{
        const salt = await bcrypt.genSalt(); 
        userDTO.password = await bcrypt.hash(userDTO.password, salt);
        const user = await this.userRepository.save(userDTO);
        delete (user as any).password
        return user;
    }

    async findOne(data: LoginDTO): Promise<User>{
        const user = await this.userRepository.findOneBy({email: data.email})
        if(!user){
            throw new UnauthorizedException('Can not find user')
        }
        return user;
    }
}
