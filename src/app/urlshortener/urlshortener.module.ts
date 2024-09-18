import { Module } from '@nestjs/common';
import { UrlShortenerController } from './urlshortener.controller';
import { UrlShortenerService } from './urlshortener.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlShortEntity } from './entity/urlShortener.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlShortEntity])],
  controllers: [UrlShortenerController],
  providers: [UrlShortenerService]
})
export class UrlshortenerModule {}
