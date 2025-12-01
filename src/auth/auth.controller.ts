import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt/jwt-guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { Roles } from './decorator/role.decorator';
import { Role } from './enums/role.enum';
import { UpdateResult } from 'typeorm';
import { UpdateUserProfileDTO } from 'src/users/dto/update-user-dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth('JWT-auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'It will create a new user.',  })
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
    @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 201,
    description: 'It will authenticate a user and return a JWT token.',  })
  login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return this.authService.login(loginDTO);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('UserProfile')
  @ApiOperation({ summary: 'Get the profile of the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'It will return the profile of the logged-in user.',  })
  getProfile(@Req() req: any) {
    const userId = req.user.userId;
    return this.userService.getUserProfile(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Put('UserProfile')
  @ApiOperation({ summary: 'Update the profile of the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'It will update and return the profile of the logged-in user.',  })
  update(
    @Body() updateUserProfileDTO: UpdateUserProfileDTO,
    @Req() req: any,
  ): Promise<UpdateResult> {
    const userId = req.user.userId;

    return this.userService.updateUserProfile(userId, updateUserProfileDTO);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/admin/UserProfile')
  @ApiOperation({ summary: 'Get all user profiles (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'It will return all user profiles.',  })
  getAllUserProfile(): Promise<User[]> {
    return this.userService.getAllUserProfile();
  }
}
