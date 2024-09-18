import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UrlShortEntity } from './entity/urlShortener.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUrlShortDto } from './dto/create-urlshort.dto';
import { UpdateUrlShortDto } from './dto/update-urlshort.dto';

@Injectable()
export class UrlShortenerService {    
    constructor(
        @InjectRepository(UrlShortEntity)
        private readonly urlShortRepository: Repository<UrlShortEntity>
    ) {}

    async findOneOrfail(id: string): Promise<UrlShortEntity> {
        try {
            return await this.urlShortRepository.findOneOrFail({where : {id: id}});
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async findAllByUser(usuarioId: string): Promise<UrlShortEntity[]> {
        return await this.urlShortRepository.find({ 
            where: { userId: { id: usuarioId } }
        });
    }

    async findByHash(hash: string): Promise<UrlShortEntity | null> {
        const url =  await this.urlShortRepository.findOne({ where: { hash } });
        
        if (!url) {
            throw new NotFoundException('URL not found');
        }
      
        return url;
    }

    async incrementAccessCount(url: UrlShortEntity): Promise<void> {
        url.accessCount += 1;
        await this.urlShortRepository.save(url);
    }

    async findByOriginURL(urlOriginal: string): Promise<UrlShortEntity | null> {
        return await this.urlShortRepository.findOne({ where: { urlOriginal } });
    }

    async createShortURL(urlOriginal: string, usuarioId): Promise<UrlShortEntity> {
        const fullHash  = uuidv4();
        const hash = fullHash.substring(0, 6); // Gera um hash único para a URL curta
        const urlShortener = `${process.env.API_URL}${hash}`; // Cria a URL curta
        const newURL = this.urlShortRepository.create({ hash, urlOriginal, urlShortener, userId: usuarioId });
        return await this.urlShortRepository.save(newURL); // Salva no banco de dados
    }

    async update(id: string, data: UpdateUrlShortDto) {
        const short = await this.findOneOrfail(id);
        this.urlShortRepository.merge(short, data);
        short.accessCount = 0;
        return await this.urlShortRepository.save(short);
    }

    async destroy(id: string) {
        await this.findOneOrfail(id);
        await this.urlShortRepository.softDelete(id);
    }

}

