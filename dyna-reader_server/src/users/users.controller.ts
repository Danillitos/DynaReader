import { Body, Controller, Get, Post, Param, Delete, UseGuards, Put} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Request } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';


// CRUD de usuários
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Endpoint de criação de usuário
    @Post('signup')
    @ApiOperation({ summary: 'Cria um novo usuário' })
    @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 409, description: 'E-mail já cadastrado' })
    async createUser(@Body() createrUserDto: CreateUserDto) {
        return await this.usersService.createUserService(createrUserDto);
    }

    // Endpoints para listar todos os usuários
    @Get('listAll')
    @ApiOperation({ summary: 'Lista todos os usuários' })
    @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso' })
    @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
    async findAll(){
        return await this.usersService.findAll()
    }

    // Endpoint para buscar um usuário por ID
    @Get('listOne/:id')
    @ApiOperation({ summary: 'Busca um usuário por ID' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    @ApiResponse({ status: 400, description: 'Parâmetro de ID inválido' })
    async findOne(@Param('id') id: number) {
        return await this.usersService.findOne(id)
    }


    @UseGuards(AuthGuard('jwt'))
    @Put('update/:id')
    @ApiOperation({ summary: 'Atualiza dados do usuário' })
    @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
    @ApiResponse({ status: 400, description: 'Dados inválidos' })
    @ApiResponse({ status: 401, description: 'Token não enviado ou inválido' })
    @ApiResponse({ status: 403, description: 'Você não tem permissão para atualizar este usuário' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
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
    @ApiOperation({ summary: 'Exclui um usuário' })
    @ApiResponse({ status: 200, description: 'Usuário excluído com sucesso' })
    @ApiResponse({ status: 401, description: 'Token não enviado ou inválido' })
    @ApiResponse({ status: 403, description: 'Você não tem permissão para excluir este usuário' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    async deleteUser(@Param('id') id: number, @Request() req) {
        const userId = req.user.userId
        if (Number(userId) !== Number(id)) {
            throw new ForbiddenException('Você não tem permissão para excluir este usuário.');
        }
        return await this.usersService.deleteUser(id)
    }

}
