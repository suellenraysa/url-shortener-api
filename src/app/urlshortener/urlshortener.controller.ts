import { Body, Controller, Delete, Get, NotFoundException, Optional, Param, ParseUUIDPipe, Post, Put, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { UrlShortenerService } from './urlshortener.service';
import { CreateUrlShortDto } from './dto/create-urlshort.dto';
import { UpdateUrlShortDto } from './dto/update-urlshort.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexUrlShortSwagger } from './swagger/index-urlshortener.swagger';
import { ShowUrlShortSwagger } from './swagger/show-urlshortener.swagger';
import { UpdateUrlShortSwagger } from './swagger/update-urlshortener.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { CreateUrlShortSwagger } from './swagger/create-urlshortener.swagger';
import { AnonymousAuthGuard } from 'src/auth/strategies/anonymous.guard';

@Controller()
@ApiTags('Shortener URL')
@ApiBearerAuth() 
export class UrlShortenerController {
    constructor(private readonly urlShortenerService: UrlShortenerService) {}

    @Post()
    @UseGuards(AnonymousAuthGuard)
    @ApiOperation({ summary: 'Encurtar uma URL' })
    @ApiBody({ 
        description: 'Objeto com a URL original a ser encurtada', 
        type: CreateUrlShortSwagger 
    })
    @ApiResponse({ 
        status: 201, 
        description: 'URL encurtada com sucesso', 
        schema: { example: { shortURL: 'http://localhost:3000/abc123', } },
        type: ShowUrlShortSwagger 
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Parâmetros inválidos',
        type: BadRequestSwagger,
    })
    async shortenUrl(
        @Body() createUrlShortDto: CreateUrlShortDto,
        @Optional()
        @Req() req: any,
    ) {        
        let user = req.user ? req.user.id : null;
        const { urlOriginal } = createUrlShortDto;

        const existingUrl = await this.urlShortenerService.findByOriginURL(urlOriginal);
        if (existingUrl) {
            return existingUrl;
        }

        const shortURL = await this.urlShortenerService.createShortURL(urlOriginal, user);
        return { shortURL };
    }

    @Get(':hash')
    @ApiOperation({ summary: 'Redirecionar para URL original' })
    @Optional()
    @ApiParam({ 
        name: 'hash', 
        description: 'Hash da URL curta', 
        example: 'abc123' 
    })
    @ApiResponse({ 
        status: 302, 
        description: 'Redirecionado com sucesso para a URL original' 
    })
    @ApiResponse({ 
        status: 404, 
        description: 'URL não encontrada' 
    })
    @Redirect() 
    async redirectUrl(@Param('hash') hash: string) {
        const url = await this.urlShortenerService.findByHash(hash);

        if (!url) {
            throw new NotFoundException('URL not found');
        }

        await this.urlShortenerService.incrementAccessCount(url);
        return { url: url.urlOriginal };
    }
    
    // @Get()
    // @ApiOperation({ summary: 'Listar todas as urls' })
    // @ApiResponse({
    //     status: 200,
    //     description: 'Lista de urls retornada com sucesso',
    //     type: IndexUrlShortSwagger,
    //     isArray: true,
    //   })
    // async index() {
    //     return await this.urlShortenerService.findAll();
    // }
    
    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Listar todas as URLs do usuário autenticado' })
    @ApiResponse({
        status: 200,
        description: 'Lista de URLs retornada com sucesso',
        type: ShowUrlShortSwagger,
        isArray: true,
    })
    @ApiResponse({
        status: 404,
        description: 'Nenhuma URL encontrada para este usuário',
        type: NotFoundSwagger,
    })
    async show(@Req() req: any) {
        const usuarioId = req.user.id;
        return await this.urlShortenerService.findAllByUser(usuarioId);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Atualizar os dados de uma url' })
    @ApiResponse({
        status: 200,
        description: 'URL atualizada com sucesso',
      })
      @ApiResponse({
        status: 400,
        description: 'Dados inválidos',
        type: BadRequestSwagger,
      })
      @ApiResponse({
        status: 404,
        description: 'Task não foi encontrada',
        type: NotFoundSwagger,
      })
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUrlShortDto) {
        await this.urlShortenerService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Inserir data de exclusão da url' })
    @ApiResponse({ status: 204, description: 'URL desativada com sucesso' })
    @ApiResponse({
        status: 404,
        description: 'URL não foi encontrada',
        type: NotFoundSwagger,
    })
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.urlShortenerService.destroy(id);
    }

}
