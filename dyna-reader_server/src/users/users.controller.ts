import { Body, Controller, Get, Post, Param, Delete, UseGuards, Put} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Request } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';


// CRUD de usuários
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Endpoint de criação de usuário
    @Post('signup')
    async createUser(@Body() createrUserDto: CreateUserDto) {
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
    @Put('update/:id')
    async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Request() req) {
        const userId = req.user.userId
        if (Number(userId) !== Number(id)) {
            throw new ForbiddenException('Você não tem permissão para atualizar este usuário.');
        }
        return await this.usersService.updateUser(id, updateUserDto);
    }

    // Endpoint para deletar um usuário
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
