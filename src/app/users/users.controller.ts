import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { 
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUsersDtoSwagger } from './swagger/create-users.swagger';
import { UpdateUsersDtoSwagger } from './swagger/update-users.swagger';
import { ShowUsersSwagger } from './swagger/show-urlshortener.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';

@Controller('users')
@ApiTags('Users') 
@ApiBearerAuth() 
export class UsersController {
  constructor(private readonly usersService: UsersService) {}  

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' }) 
  @ApiBody({ 
    description: 'Dados para criação de um novo usuário', 
    type: CreateUsersDtoSwagger 
  }) 
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      }
    },
    type: CreateUsersDtoSwagger
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos',
    type: BadRequestSwagger,
  }) 
  async create(@Body() body: CreateUsersDto ) {
    return await this.usersService.create(body);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Atualizar os dados de um usuário' })
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do usuário', 
    type: 'string' 
  }) 
  @ApiBody({ 
    description: 'Dados para atualizar o usuário', 
    type: UpdateUsersDtoSwagger 
  }) 
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      }
    },
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  }) 
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUsersDto,
  ) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Deletar um usuário' }) // Descrição da operação
  @ApiParam({ 
    name: 'id', 
    description: 'UUID do usuário', 
    type: 'string' 
  }) 
  @ApiResponse({ 
    status: 204, 
    description: 'Usuário deletado com sucesso.' 
  }) 
  @ApiResponse({ 
    status: 404, 
    description: 'Usuário não encontrado' 
  }) 
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.usersService.destroy(id);
  }
}


// @Get()
  // async index() {
  //   return await this.usersService.findAll();
  // }

  // @Get(':id')
  // async show(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return await this.usersService.findOneOrFail({ where: { id } });
  // }