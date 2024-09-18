import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerController } from './urlshortener.controller';

describe('UrlshortenerController', () => {
  let controller: UrlShortenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortenerController],
    }).compile();

    controller = module.get<UrlShortenerController>(UrlShortenerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
