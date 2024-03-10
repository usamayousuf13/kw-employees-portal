// src/users/users.controller.ts

import { Controller, Post, Body, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User registered successfully' })
  @ApiBadRequestResponse({
    description: 'Invalid invitation token or Bad Request',
  })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Query('invitationToken') invitationToken: string,
  ): Promise<any> {
    // Validate invitation token
    const isValidInvitation = await this.usersService.validateInvitation(
      invitationToken,
    );

    if (!isValidInvitation) {
      return { message: 'Invalid invitation token' };
    }

    // Proceed with user registration
    const user = await this.usersService.register(createUserDto);
    return { message: 'User registered successfully', user };
  }

  @ApiOperation({ summary: 'Login with username and password' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({
    status: 400,
    description: 'Invalid credentials or Bad Request',
  })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.login(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user };
  }

  @ApiOperation({ summary: 'Send an invitation to register' })
  @ApiCreatedResponse({ description: 'Invitation sent successfully' })
  @ApiBadRequestResponse({
    description: 'User not found or User not allowed to send invite',
  })
  @Post('send-invite/:username')
  async sendInvite(@Param('username') username: string): Promise<any> {
    const existingUser = await this.usersService.findByUsername(username);
    console.log('existing: ', existingUser);

    if (!existingUser || existingUser.role !== 'Admin') {
      return {
        message: !existingUser
          ? 'User not found'
          : 'User not allowed to send invite',
      };
    }
    // Generate a unique token and set expiration (e.g., 24 hours)
    const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
    // Create the invitation in the invites collection
    const invite = await this.usersService.createInvitation(
      username,
      expiration,
    );

    console.log(`Invitation sent successfully for ${invite}`);
    return {
      message: `Invitation sent successfully. Invitation code: ${invite.token}`,
    };
  }
}
