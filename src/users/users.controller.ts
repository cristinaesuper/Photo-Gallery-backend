import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get(':email')
  @ApiOkResponse({ type: UserEntity })
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Post('login')
  @ApiOkResponse({ type: UserEntity })
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.usersService.findOneByEmail(email);

    if (!user || user.password !== password) {
      return;
    }

    return user;
  }
}
