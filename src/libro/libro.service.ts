import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>, // Cambia el tipo a LibroRepository
  ) {}  

  async create(libro: Libro) : Promise<Libro> {
    if (libro.fecha_publicacion > new Date()) {
      throw new BadRequestException('La fecha de publicación no puede ser mayor o igual a la fecha actual');
    }
    return await this.libroRepository.save(libro);
  }

  async findAll(): Promise<Libro[]> {
    const libros : Libro[] = await this.libroRepository.find({ relations: ['bibliotecas'] });
    return libros;
  }

  async findOne(id: string): Promise<Libro>  {
    const libro: Libro | null = await this.libroRepository.findOne({ where: { id }, relations: ['bibliotecas'] });
    if (!libro) {
      throw new BadRequestException('El libro no existe');
    }
    return libro;
  }

  async update(id: string, libro: Libro) : Promise<Libro> {
    const libroExistente: Libro | null = await this.libroRepository.findOne({ where: { id } });
    if (!libroExistente) {
      throw new BadRequestException('El libro no existe');
    }
    if (libro.fecha_publicacion > new Date()) {
      throw new BadRequestException('La fecha de publicación no puede ser mayor o igual a la fecha actual');
    }

    return await this.libroRepository.save({ ...libroExistente, ...libro });
  }

  async delete(id: string) {
    const libro : Libro|null = await this.libroRepository.findOne({ where: { id } });
    if (!libro) {
      throw new BadRequestException('El libro no existe');
    }
    await this.libroRepository.remove([libro]);
  }


}
