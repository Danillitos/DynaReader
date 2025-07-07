import { Body, Controller } from '@nestjs/common';
import { CreaterUserDto } from './dto/creater-user.dto';
import { UsersService } from './users.service';
import { Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('signup')
    async createUser(@Body() createrUserDto: CreaterUserDto) {
        return await this.usersService.createUserService(createrUserDto);
    }
}
