import { Injectable, Redirect, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// import { User } from '../users/user.entity';
import { LoginDTO } from './dto/login-dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { use } from 'passport';
// import { ArtistsService } from '../artists/artists.service';
import { PayloadType } from './guards/jwt/types';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    // private artistService: ArtistsService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{
    accessToken: String;
    user: {
      id: number;
      email: string;
      role: string;
      redirectUrl?: string; // thêm đường dẫn
    };
  }> {
    const user = await this.userService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (passwordMatched) {
      delete (user as any).password;
      const payload: PayloadType = {
        email: user.email,
        userId: user.id,
        role: user.role,
      };

      const redirectUrl = user.role === Role.Admin ? '/admin/dashboard' : '/';

      return {
        accessToken: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          redirectUrl,
        },
      };
    } else {
      throw new UnauthorizedException('Password does not match'); // 5.
    }
  }
}
