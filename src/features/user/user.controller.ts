import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { FastifyRequest } from 'fastify';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getLoginUser(@Req() req: FastifyRequest): Omit<User, 'hashedPassword'> {
    console.log({ uesr: req.user });
    return req.user;
  }

  @Patch()
  updateUser(
    @Req() req: FastifyRequest,
    @Body() dto: UpdateUserDto
  ): Promise<Omit<User, 'hashedPassword'>> {
    return this.userService.updateUser(req.user.id, dto);
  }
}
