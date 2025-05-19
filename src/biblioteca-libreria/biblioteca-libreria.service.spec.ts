import { Test, TestingModule } from '@nestjs/testing';
import { BibliotecaLibreriaService } from './biblioteca-libreria.service';

describe('BibliotecaLibreriaService', () => {
  let service: BibliotecaLibreriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BibliotecaLibreriaService],
    }).compile();

    service = module.get<BibliotecaLibreriaService>(BibliotecaLibreriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
