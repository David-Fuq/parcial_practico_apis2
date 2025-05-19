import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroDto } from './dto/libro.dto';
import { plainToInstance } from 'class-transformer';
import { Libro } from './entities/libro.entity';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Post()
    async create(@Body() libroDto: LibroDto) {
      const biblioteca : Libro = plainToInstance(Libro, libroDto);
      return await this.libroService.create(biblioteca);
    }
  
    @Get()
    async findAll() {
      return await this.libroService.findAll();
    }
  
    @Get(':libroId')
    async findOne(@Param('libroId') libroId: string) {
      return await this.libroService.findOne(libroId);
    }
  
    @Put(':libroId')
    async update(@Param('libroId') libroId: string, @Body() libroDto: LibroDto) {
      const biblioteca : Libro = plainToInstance(Libro, libroDto);
      return await this.libroService.update(libroId, biblioteca);
    }
  
    @Delete(':libroId')
    @HttpCode(204)
    async delete(@Param('libroId') libroId: string) {
      return await this.libroService.delete(libroId);
    }
}
