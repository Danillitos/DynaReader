import { Body, Controller, Get, Post, Param, Delete, UseGuards} from '@nestjs/common';
import { CreaterUserDto } from './dto/creater-user.dto';
import { UsersService } from './users.service';
import { Request } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


// CRUD de usuários
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Endpoint de criação de usuário
    @Post('signup')
    async createUser(@Body() createrUserDto: CreaterUserDto) {
        return await this.usersService.createUserService(createrUserDto);
    }

    // Endpoints para listar todos os usuários
    @Get('listAll')
    async findAll(){
        return await this.usersService.findAll()
    }

    // Endpoint para buscar um usuário por ID
    @Get('listOne/:id')
    async findOne(@Param('id') id: number) {
        return await this.usersService.findOne(id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    async deleteUser(@Param('id') id: number, @Request() req) {
        const userId = req.user.userId
        if (Number(userId) !== Number(id)) {
            throw new ForbiddenException('Você não tem permissão para excluir este usuário.');
        }
        return await this.usersService.deleteUser(id)
    }

}
