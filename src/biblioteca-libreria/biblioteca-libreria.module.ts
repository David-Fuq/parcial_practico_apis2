import { Module } from '@nestjs/common';
import { BibliotecaLibreriaService } from './biblioteca-libreria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Biblioteca } from 'src/biblioteca/entities/biblioteca.entity';
import { Libro } from 'src/libro/entities/libro.entity';
import { BibliotecaLibreriaController } from './biblioteca-libreria.controller';

@Module({
  providers: [BibliotecaLibreriaService],
  imports: [TypeOrmModule.forFeature([Biblioteca, Libro])],
  controllers: [BibliotecaLibreriaController] 
})
export class BibliotecaLibreriaModule {}
