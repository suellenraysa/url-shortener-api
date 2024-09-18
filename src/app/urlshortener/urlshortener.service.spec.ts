import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerService } from './urlshortener.service';

describe('UrlShortenerService', () => {
  let service: UrlShortenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlShortenerService],
    }).compile();

    service = module.get<UrlShortenerService>(UrlShortenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
