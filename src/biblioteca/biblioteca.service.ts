import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Biblioteca } from './entities/biblioteca.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BibliotecaService {

  constructor(
    @InjectRepository(Biblioteca)
    private readonly bibliotecaRepository: Repository<Biblioteca>, // Cambia el tipo a BibliotecaRepository
  ) {}

  async create(biblioteca: Biblioteca) : Promise<Biblioteca> {
    if (biblioteca.hora_cierre < biblioteca.hora_apertura) {
      throw new BadRequestException('La hora de cierre no puede ser menor que la hora de apertura');
    }
    return await this.bibliotecaRepository.save(biblioteca);
  }

  async findAll(): Promise<Biblioteca[]> {
    const bibliotecas : Biblioteca[] = await this.bibliotecaRepository.find({ relations: ['libros'] });
    return bibliotecas;
  }

  async findOne(id: string): Promise<Biblioteca>  {
    const biblioteca : Biblioteca | null = await this.bibliotecaRepository.findOne({ where: { id }, relations: ['libros'] });
    if (!biblioteca) {
      throw new BadRequestException('La biblioteca no existe');
    }
    return biblioteca;
  }

  async update(id: string, biblioteca: Biblioteca) : Promise<Biblioteca> {
    const bibliotecaExistente : Biblioteca | null = await this.bibliotecaRepository.findOne({ where: { id } });
    if (!bibliotecaExistente) {
      throw new BadRequestException('La biblioteca no existe');
    }
    if (biblioteca.hora_cierre < biblioteca.hora_apertura) {
      throw new BadRequestException('La hora de cierre no puede ser menor que la hora de apertura');
    }

    return await this.bibliotecaRepository.save({ ...bibliotecaExistente, ...biblioteca });
  }

  async delete(id: string) {
    const biblioteca : Biblioteca | null = await this.bibliotecaRepository.findOne({ where: { id } });
    if (!biblioteca) {
      throw new BadRequestException('La biblioteca no existe');
    }
    await this.bibliotecaRepository.remove([biblioteca]);
  }
}
