import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Biblioteca } from 'src/biblioteca/entities/biblioteca.entity';
import { Libro } from 'src/libro/entities/libro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BibliotecaLibreriaService {
    constructor(
        @InjectRepository(Biblioteca)
        private readonly bibliotecaRepository: Repository<Biblioteca>,

        @InjectRepository(Libro)
        private readonly libroRepository: Repository<Libro>,
    ) {}

    async addBookToLibrary(bibliotecaId: string, libroId: string): Promise<Biblioteca> {
        const biblioteca: Biblioteca | null = await this.bibliotecaRepository.findOne({ where: { id: bibliotecaId }, relations: ['libros'] });
        const libro: Libro | null = await this.libroRepository.findOne({ where: { id: libroId } });

        if (!biblioteca) {
            throw new BadRequestException('Biblioteca not found');
        }

        if (!libro) {
            throw new BadRequestException('Libro not found');
        }

        biblioteca.libros = [...biblioteca.libros, libro];
        return await this.bibliotecaRepository.save(biblioteca);
    }

    async findBooksFromLibrary(bibliotecaId: string): Promise<Libro[]> {
        const biblioteca = await this.bibliotecaRepository.findOne({ where: { id: bibliotecaId }, relations: ['libros'] });

        if (!biblioteca) {
            throw new BadRequestException('Biblioteca not found');
        }

        return biblioteca.libros;
    }

    async findBookFromLibrary(bibliotecaId: string, libroId: string): Promise<Libro> {
        const biblioteca : Biblioteca | null = await this.bibliotecaRepository.findOne({ where: { id: bibliotecaId }, relations: ['libros'] });

        if (!biblioteca) {
            throw new BadRequestException('Biblioteca not found');
        }

        const libro : Libro | undefined = biblioteca.libros.find(libro => libro.id === libroId);

        if (!libro) {
            throw new BadRequestException('Libro not found in this biblioteca');
        }

        return libro;
    }

    async updateBooksFromLibrary(bibliotecaId: string, libros: Libro[]): Promise<Biblioteca> {
        const biblioteca : Biblioteca | null = await this.bibliotecaRepository.findOne({ where: { id: bibliotecaId }, relations: ['libros'] });

        if (!biblioteca) {
            throw new BadRequestException('Biblioteca not found');
        }

        for (const libro of libros){
            const libroExistente : Libro | null = await this.libroRepository.findOne({ where: { id: libro.id } });
            if (!libroExistente) {
                throw new BadRequestException('Libro not found');
            }
        }

        biblioteca.libros = libros;
        return await this.bibliotecaRepository.save(biblioteca);
    }

    async deleteBookFromLibrary(bibliotecaId: string, libroId: string) {
        const biblioteca : Biblioteca | null = await this.bibliotecaRepository.findOne({ where: { id: bibliotecaId }, relations: ['libros'] });

        if (!biblioteca) {
            throw new BadRequestException('Biblioteca not found');
        }

        const libro : Libro | undefined = biblioteca.libros.find(libro => libro.id === libroId);

        if (!libro) {
            throw new BadRequestException('Libro not found in this biblioteca');
        }

        biblioteca.libros = biblioteca.libros.filter(libro => libro.id !== libroId);
        await this.bibliotecaRepository.save(biblioteca);
    }

}
